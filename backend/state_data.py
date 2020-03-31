import requests
import pandas as pd

def get_states():
    
    eia_key = '8fa9d0a2954dfcf18c3351843a9af7cb'

    eia_headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    # DataUSA gives a 403 Forbidden error unless we pretend we're Postman or a browser
    datausa_headers = {
        'User-Agent': 'PostmanRuntime/7.18.0',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Postman-Token': '4b4913b4-f167-4fdd-bf86-b295b9aca566',
        'Host': 'datausa.io',
        'Accept-Encoding': 'gzip, deflate',
        'Cookie': '__cfduid=d0d1544cc9ff8539aba11090b36ea69531571169610',
        'Connection': 'keep-alive'
       }

    # dict of <energy type name>: DataFrame
    df_dict = {}

    # category IDs for consumption of some energy type
    en_types_response = requests.get('http://api.eia.gov/category/?api_key={}&category_id=40236'.format(eia_key), headers=eia_headers)
    if (en_types_response.status_code != 200):
        print('Failed API call for 40236')
        return None
    en_types_cats = en_types_response.json()['category']['childcategories']
    en_types_df = pd.DataFrame(en_types_cats)

    accepted_types = ['All Petroleum Products', 'Biomass', 'Coal', 'Geothermal', 'Hydroelectricity',
                          'Natural Gas excluding Supplemental Gaseous Fuels', 'Nuclear Power',
                            'Solar Energy', 'Wind Energy', 'Wood and Waste']
    en_types_df = en_types_df[en_types_df['name'].isin(accepted_types)]

    # for every energy type in en_types_df, get the category ID for consumption in BTU, and get the series IDs to look up
    # data for every state
    for index, row in en_types_df.iterrows():
        state_record_list = []
        
        en_type_cat_id = row['category_id']
        en_type_name = row['name']
        
        # category IDs for physical units vs. btu for this energy type
        unit_types_response = requests.get('http://api.eia.gov/category/?api_key={}&category_id={}'.format(eia_key, en_type_cat_id), headers=eia_headers)
        if (unit_types_response.status_code != 200):
            print('Failed API call for', en_type_cat_id)
            return None
        unit_types_cats = unit_types_response.json()['category']['childcategories']
        unit_types_df = pd.DataFrame(unit_types_cats)
        unit_types_df = unit_types_df.loc[unit_types_df['name'] == 'Btu']

        unit_type_cat_id = unit_types_df.iloc[0]['category_id']

        # series IDs for all state data lookup, for consumption of this energy type in BTU
        series_ids_response = requests.get('http://api.eia.gov/category/?api_key={}&category_id={}'.format(eia_key, unit_type_cat_id), headers=eia_headers)
        if (series_ids_response.status_code != 200):
            print('Failed API call for', unit_type_cat_id)
            return None
        series_ids = series_ids_response.json()['category']['childseries']
        series_ids_df = pd.DataFrame(series_ids)
        series_ids_df = series_ids_df[['series_id']]

        # looping over states
        for index, row in series_ids_df.iterrows():
            state_data_dict = {}
            
            state_data_response = requests.get('http://api.eia.gov/series/?api_key={}&series_id={}'.format(eia_key, row['series_id']), headers=eia_headers)
            if (state_data_response.status_code != 200):
                print('Failed API call for', row['series_id'])
                return None
            
            #state_data_dict['Name'] = state_data_response.json()['series'][0]['geography']
            if (en_type_name == 'Nuclear Power'):
                state_name = state_data_response.json()['series'][0]['name'].split(', ')[2]
            else:
                state_name = state_data_response.json()['series'][0]['name'].split(', ')[1]
            # skip DC -- no Congress members representing it
            if (state_name == 'District of Columbia'):
                continue
            state_data_dict['Name'] = state_name
            energy_data_list = state_data_response.json()['series'][0]['data']
            
            for info in energy_data_list:
                year = info[0]
                if (int(year) >= 1993):
                    btu = info[1]
                    state_data_dict[year] = btu
            
            state_record_list.append(state_data_dict)
            
        df = pd.DataFrame(state_record_list)
        df_dict[en_type_name] = df
    
    # basic information -- population & median household income
    base_state_df = pd.DataFrame()
    
    pop_response = requests.get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest', headers=datausa_headers)
    if (pop_response.status_code != 200):
        print('Failed API call for DataUSA population,', income_response.status_code)
        return None
    pop_data = pop_response.json()['data']
    pop_df = pd.DataFrame(pop_data)
    # drop DC & PR -- no Congress members representing them
    pop_df.drop(pop_df.index[pop_df['State'] == 'District of Columbia'], inplace = True)
    pop_df.drop(pop_df.index[pop_df['State'] == 'Puerto Rico'], inplace = True)
    
    base_state_df['Name'] = pop_df['State']
    base_state_df['Population'] = pop_df['Population']
    
    income_response = requests.get('https://datausa.io/api/data?drilldowns=State&measure=Household%20Income%20by%20Race&year=latest', headers=datausa_headers)
    if (income_response.status_code != 200):
        print('Failed API call for DataUSA median HH income,', income_response.status_code)
    income_data = income_response.json()['data']
    income_df = pd.DataFrame(income_data)
    
    base_state_df['Median_HH_Income'] = income_df['Household Income by Race']
    
    print(base_state_df)
    
    return (base_state_df, df_dict)