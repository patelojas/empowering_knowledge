import requests
import pandas as pd
import sqlalchemy as db
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, select, Float, Boolean

engine = db.create_engine('mysql+pymysql://admin:SWEswe-123@empowering-db.ccanwhd1wsdp.us-east-1.rds.amazonaws.com:3306/empowering_db1')
connection = engine.connect()
meta = MetaData()

def get_congresses():
    headers = {
        'X-API-Key': 'aLPU1BjfQphfOWjE0Z7Y1tB2pRRvGJl5loZe37U3',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    } 

    headers_image = { 'User-Agent': 'Chrome/32.0.1700.107'}
    
    entry_list = []
    chambers = ['senate', 'house']


    # Congress meetings that overlap with available bill data (1993-present)
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
            1234               | 115          | senate
            1235               | 115          | house
            1236               | 116          | senate
            ...

            and additionally create a separate join table similar to:
            id (p. key)        | CMem_id (foreign key)   | CNum_id (f. key, p. in above table)
            5678               | 9101                    | 1234
            5679               | 9101                    | 1236

            this shows the Congress member with id 9101 in our CongressMember table served in
            the Senate in both the 115th and 116th Congress

            for now the df just contains multiple records of the same Congress member

            also need to establish relationship with State via foreign key
            """
           
            for index, row in df.iterrows():
                member_id = row['id']
                member_dict = {}
                member_dict['member_id'] = member_id
                member_dict['con_num'] = con_num
                member_dict['chamber_name'] = ch_name
                entry_list.append(member_dict)
                
    return pd.DataFrame(entry_list)

def create_con_num_table():
    congresses = Table(
        'Congresses', meta,
        Column('member_id', String(16)),
        Column('chamber', String(6)),
        Column('con_num', Integer),
        Column('id', Integer, primary_key=True, autoincrement=True),
        )

    meta.create_all(engine)

    df = get_congresses()

    for index, row in df.iterrows():
        ins = congresses.insert().values(member_id = row['member_id'], 
            chamber = row['chamber_name'], con_num = row['con_num'])
        conn = engine.connect()
        conn.execute(ins)
