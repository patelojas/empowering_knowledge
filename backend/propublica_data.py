import requests
import pandas as pd

# wrote commented DB table example thinking we would generate primary keys, but member_id looks
# like a reasonable primary key. and we will need it to access their voting record
def get_members():
    
    headers = {
        'X-API-Key': 'aLPU1BjfQphfOWjE0Z7Y1tB2pRRvGJl5loZe37U3',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    default_url = "https://gitlab.com/patelojasv/cs373-web/raw/master/frontend/empoweringknowledge/src/emptyperson.png"
    headers_image = { 'User-Agent': 'Chrome/32.0.1700.107'}
    
    master_df = pd.DataFrame()
    chambers = ['senate', 'house']

    # set of added ids 
    added_members = set()

    # Congress meetings that overlap with available bill data (1993-present)

    # 103, 117
    for con_num in range(103, 117):
        for ch_name in chambers:
            response = requests.get('https://api.propublica.org/congress/v1/{}/{}/members.json'.format(con_num, ch_name), headers=headers)
            if response.status_code != 200:
                return None
		    
            data = response.json()
            members = data['results'][0]['members']
            df = pd.DataFrame (members)

            members_to_add = pd.DataFrame()

            """
		    we will create a separate table similar to:
		    id (primary key)   | congress_num | chamber
		    1234			   | 115		  | senate
		    1235			   | 115 		  | house
		    1236			   | 116 		  | senate
		    ...

		    and additionally create a separate join table similar to:
		    id (p. key)        | CMem_id (foreign key)   | CNum_id (f. key, p. in above table)
		    5678			   | 9101					 | 1234
		    5679			   | 9101					 | 1236

		    this shows the Congress member with id 9101 in our CongressMember table served in
		    the Senate in both the 115th and 116th Congress

			for now the df just contains multiple records of the same Congress member

			also need to establish relationship with State via foreign key
		    """
            if(ch_name == 'senate'):
                df['district'] = None

            for index, row in df.iterrows():
                if not row['id'] in added_members:

                    # default image URL: https://gitlab.com/patelojasv/cs373-web/raw/master/frontend/empoweringknowledge/src/emptyperson.png

                    '''
                    checking if the image for a given representative exists

                    import requests

                    default_url = "https://gitlab.com/patelojasv/cs373-web/raw/master/frontend/empoweringknowledge/src/emptyperson.png"
                    url = 'https://theunitedstates.io/images/congress/original/{}.jpg'.format(id)
                    headers_image = { 'User-Agent': 'Chrome/32.0.1700.107'}
                    if requests.get(url, headers=headers_image).status_code == 404:
                        url = default_url

                    

                    '''

                    states = {
                    'AK': 'Alaska',
                    'AL': 'Alabama',
                    'AR': 'Arkansas',
                    'AS': 'American Samoa',
                    'AZ': 'Arizona',
                    'CA': 'California',
                    'CO': 'Colorado',
                    'CT': 'Connecticut',
                    'DC': 'District of Columbia',
                    'DE': 'Delaware',
                    'FL': 'Florida',
                    'GA': 'Georgia',
                    'GU': 'Guam',
                    'HI': 'Hawaii',
                    'IA': 'Iowa',
                    'ID': 'Idaho',
                    'IL': 'Illinois',
                    'IN': 'Indiana',
                    'KS': 'Kansas',
                    'KY': 'Kentucky',
                    'LA': 'Louisiana',
                    'MA': 'Massachusetts',
                    'MD': 'Maryland',
                    'ME': 'Maine',
                    'MI': 'Michigan',
                    'MN': 'Minnesota',
                    'MO': 'Missouri',
                    'MP': 'Northern Mariana Islands',
                    'MS': 'Mississippi',
                    'MT': 'Montana',
                    'NA': 'National',
                    'NC': 'North Carolina',
                    'ND': 'North Dakota',
                    'NE': 'Nebraska',
                    'NH': 'New Hampshire',
                    'NJ': 'New Jersey',
                    'NM': 'New Mexico',
                    'NV': 'Nevada',
                    'NY': 'New York',
                    'OH': 'Ohio',
                    'OK': 'Oklahoma',
                    'OR': 'Oregon',
                    'PA': 'Pennsylvania',
                    'PR': 'Puerto Rico',
                    'RI': 'Rhode Island',
                    'SC': 'South Carolina',
                    'SD': 'South Dakota',
                    'TN': 'Tennessee',
                    'TX': 'Texas',
                    'UT': 'Utah',
                    'VA': 'Virginia',
                    'VI': 'Virgin Islands',
                    'VT': 'Vermont',
                    'WA': 'Washington',
                    'WI': 'Wisconsin',
                    'WV': 'West Virginia',
                    'WY': 'Wyoming'
                    }

                    image_url = 'https://theunitedstates.io/images/congress/original/{}.jpg'.format(row['id'])
                    if requests.get(image_url, headers = headers_image).status_code == 404:
                        image_url = default_url

                    # Set the twitter handle to the default if they don't have a twitter
                    if row['twitter_account'] == None:
                        row['twitter_account'] = "twitter"
                    if row['office'] == None:
                        row['office'] = "Office not given"
                    if row['district'] == None:
                        row['district'] = "0"
                    if row['votes_with_party_pct'] == None:
                        row['votes_with_party_pct'] = "0"
                    if row['facebook_account'] == None:
                        row['facebook_account'] = "Facebook not given"
                    if row['cspan_id'] == None:
                        row['cspan_id'] = "Not given"

                    row['full_state'] = states[row['state']]

                    data = [[row['first_name'], row['last_name'], row['date_of_birth'], row['party'], row['state'], row['full_state'],
                        row['district'], row['votes_with_party_pct'], row['office'], row['twitter_account'], row['title'],
                        row['facebook_account'], row['phone'], row['url'], row['cspan_id'], row['id'], image_url]]

                    members_to_add = pd.concat([pd.DataFrame(data, columns = ['first_name', 'last_name', 
                        'date_of_birth', 'party', 'state', 'full_state',
                        'district', 'votes_with_party_pct', 'office', 'twitter_account', 'title',
                        'facebook_account', 'phone', 'url', 'cspan_id', 'id', 'image_url']), members_to_add])
                    
                    added_members.add(row['id'])

            master_df = pd.concat([members_to_add, master_df], ignore_index=True)
                
    return master_df


# again wrote DB table example assuming generated primary keys, but bill_id looks like a good
# primary key. also returned by API call to retrieve voting record, would be easy to establish
# the relationship with bill_id as the primary key
def get_bills():

    headers = {
        'X-API-Key': 'aLPU1BjfQphfOWjE0Z7Y1tB2pRRvGJl5loZe37U3',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    master_df = pd.DataFrame()
    more = True
    offset = 0  

    while offset <= 7200:
        response = requests.get('https://api.propublica.org/congress/v1/bills/subjects/energy.json?offset={}'.format(offset), headers=headers)
        if response.status_code != 200:
            return None
        
        print(offset)
        data = response.json()
        bills = data['results']

        """
        flattens nested parts, ex.
        cosponsors_by_party: {
            "D": 1,
            "R": 2
        }
        becomes
        cosponsors_by_party_D: 1,
        cosponsors_by_party_R: 2

        need to do this to convert to df
        """
        df = pd.io.json.json_normalize(bills, sep='_')

        """
        can establish link to CongressMember record using sponsor_id (same as member_id returned
        by API call for members)
        """

        df = df[['bill_id', 'bill_type', 'title', 'short_title', 'sponsor_id',
                'introduced_date', 'committees',
                'active', 'last_vote', 'enacted', 'vetoed', 'congressdotgov_url', 'govtrack_url',
                'house_passage', 'senate_passage', 'cosponsors_by_party_R',
                'cosponsors_by_party_D','summary', 'summary_short', 'primary_subject']]
        df = df.replace(float('nan'), "0")
        df['cosponsors_by_party_D'] = df.cosponsors_by_party_D.apply(lambda x: int(x))
        df['cosponsors_by_party_R'] = df.cosponsors_by_party_R.apply(lambda x: int(x))
        df = df.loc[(df['primary_subject'] == "Taxation") | 
                         (df['primary_subject'] == "Energy") |
                         (df['primary_subject'] == "Public Lands and Natural Resources") |
                         (df['primary_subject'] == "Transportation and Public Works") |
                         (df['primary_subject'] == "Water Resources Development")]
       
        master_df = pd.concat([master_df, df], ignore_index=True)

        offset += 20
    return master_df


"""
after creating the Bill table, pass bill_ids to this function to get a list of cosponsor ids.
we would then want to have a join table where each row has a foreign key pointing to a row in
the Bill table and another foreign key pointing to a row in the CongressMember table
(N rows in the join table for a bill with N cosponsors)
"""
def get_cosponsors(bill_id):
    headers = {
        'X-API-Key': 'aLPU1BjfQphfOWjE0Z7Y1tB2pRRvGJl5loZe37U3',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    info = bill_id.split('-')
    bill_num = info[0]
    con_num = info[1]

    response = requests.get('https://api.propublica.org/congress/v1/{}/bills/{}/cosponsors.json'.format(con_num, bill_num), headers=headers)
    if (response.status_code != 200):
        return None

    data = response.json()['results'][0]['cosponsors']
    if (len(data) == 0):
        return []
    else:
        df = pd.DataFrame(data)
        return df['cosponsor_id'].tolist() # primary keys in CongressMember table


# after creating CongressMember table, pass member_ids to this function to link votes to bills
# again, CMem_id and Bill_id are as if generated rather than using member_id & bill_id
def get_votes(member_id):
    """
	table for bill-vote pairs:
	id (p. key)     | Bill_id (f. key)  | vote
	123				| 456				| Yes
	124				| 456				| No
	125				| 457				| Yes
	...

	join table:
	id (p. key)		| CMem_id (f. key)  | Vote_id (f. key, p. in above table)
	12				| 9101				| 124
	13				| 9101				| 125

	shows member with id 9101 in CongressMember table voted No on bill with id 456 in Bill
	table and Yes on bill with id 457
	"""

    headers = {
        'X-API-Key': 'aLPU1BjfQphfOWjE0Z7Y1tB2pRRvGJl5loZe37U3',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }	

    response = requests.get('https://api.propublica.org/congress/v1/members/{}/votes.json'.format(member_id), headers=headers)
    if response.status_code != 200:
        return None

    data = response.json()

    df = pd.io.json.json_normalize(bills, sep='_')

    df = df['question' == 'On the Passage']
    df = df[['member_id', 'bill_bill_id', 'position']]
    df.rename(columns={'bill_bill_id': 'bill_id'}, inplace=True)

    return df
