import requests
import pandas as pd
import sqlalchemy as db
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, select, Float, Boolean, ForeignKey
from cosponsors import get_cosponsor_data

engine = db.create_engine('mysql+pymysql://admin:SWEswe-123@empowering-db.ccanwhd1wsdp.us-east-1.rds.amazonaws.com:3306/empowering_db1')
connection = engine.connect()
meta = MetaData()
meta.bind = engine

def create_cosponsors_table():
    cosponsors = Table(
        'Cosponsors', meta,
        Column('id', Integer, primary_key=True, autoincrement=True),
        Column('bill_id', String(16)),
        Column('cosponsor_id', String(16))
        )

    meta.create_all(engine)

    record_list = get_cosponsor_data()

    for record in record_list:
        ins = cosponsors.insert().values(bill_id = record['bill_id'], 
            cosponsor_id = record['cosponsor_id'])
        conn = engine.connect()
        conn.execute(ins)
