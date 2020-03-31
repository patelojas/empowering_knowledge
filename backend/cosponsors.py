import collections
import requests
import pandas as pd
# from app.main import Bills
# tries to run app even if I wrap the app code in a conditional for __name__=="__main__", so just redeclared Bills here
from flask import *
import flask_sqlalchemy

# Create the Flask application and the Flask-SQLAlchemy object
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:SWEswe-123@empowering-db.ccanwhd1wsdp.us-east-1.rds.amazonaws.com:3306/empowering_db1'
db = flask_sqlalchemy.SQLAlchemy(app)

class Bills(db.Model):
    __tablename__ = 'Bills'
    bill_id = db.Column(db.Unicode, primary_key=True)
    bill_type = db.Column(db.Unicode)
    title = db.Column(db.Unicode)
    short_title = db.Column(db.Unicode)
    sponsor_id = db.Column(db.Unicode)
    introduced_date = db.Column(db.Unicode)
    cosponsors_by_party_R = db.Column(db.Unicode)
    cosponsors_by_party_D = db.Column(db.Unicode)
    committees = db.Column(db.Unicode)
    active = db.Column(db.Boolean)
    congressdotgov_url = db.Column(db.Unicode)
    govtrack_url = db.Column(db.Unicode)
    house_passage = db.Column(db.Unicode)
    senate_passage = db.Column(db.Unicode)
    summary = db.Column(db.Unicode)
    summary_short = db.Column(db.Unicode)

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

# will take 5+ mins to run
def get_cosponsor_data():
    record_list = collections.deque()
    
    bills = Bills.query.all()
    bill_ids = [b.bill_id for b in bills]
    
    i = 1
    for b_id in bill_ids:
        cs_list = get_cosponsors(b_id) # list of cosponsors for this bill
        for cs in cs_list:
            record_list.append({"bill_id": b_id, "cosponsor_id": cs})
        if (i % 100 == 0):
            print("Collected cosponsors for {} out of {} bills".format(i, len(bills)))
        i += 1
                  
    print("Finished collecting cosponsors")
            
    return record_list