import requests
import json
import unittest
import pandas 
import propublica_data
import state_data
import con_num
import api_call
import gitlabapi 

url = "http://3.84.54.129:5000/"
#url = "http://0.0.0.0:80/"
class ApiTests(unittest.TestCase):
    def test1(self):
        response = requests.request("GET", url)
        assert(not response.ok)

    def test2(self):
        response = requests.request("GET", url + "api/congressmembers")
        models = response.json() 
        attrs = ['member_id', 'first_name', 'last_name', 'date_of_birth', 'party', 'state', 'district', 'votes_with_party_pct', 'office', 'twitter_account', 'title', 'facebook_account', 'phone', 'url', 'cspan_id']
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/congressmembers?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)

    def test3(self):
        response = requests.request("GET", url + "api/states")
        models = response.json() 
        attrs = ['name', 'population', 'median_hh_income'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/states?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)
    
    def test4(self):
        response = requests.request("GET", url + "api/bills")
        models = response.json() 
        attrs = ['bill_id', 'bill_type', 'title', 'short_title', 'sponsor_id', 'introduced_date', 'cosponsors_by_party_D', 'cosponsors_by_party_R', 'committees', 'active', 'congressdotgov_url', 'govtrack_url', 'house_passage', 'senate_passage', 'summary', 'summary_short']
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/bills?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)
    
    def test5(self):
        response = requests.request("GET", url + "api/petroleum")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/petroleum?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)

    def test6(self):
        response = requests.request("GET", url + "api/biomass")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/biomass?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)

    def test7(self):
        response = requests.request("GET", url + "api/coal")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/coal?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)
    
    def test8(self):
        response = requests.request("GET", url + "api/geothermal")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/geothermal?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)
    
    def test9(self):
        response = requests.request("GET", url + "api/hydroelectricity")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/hydroelectricity?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)
    
    def test10(self):
        response = requests.request("GET", url + "api/naturalgas")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/naturalgas?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)
    
    def test11(self):
        response = requests.request("GET", url + "api/solarenergy")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/solarenergy?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)

    def test12(self):
        response = requests.request("GET", url + "api/windenergy")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/windenergy?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)

    def test13(self):
        response = requests.request("GET", url + "api/woodandwaste")
        models = response.json() 
        attrs = ['data_1993','data_1994', 'data_1995', 'data_1996', 'data_1997', 'data_1998', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003', 'data_2004', 'data_2005', 'data_2006', 'data_2007', 'data_2008', 'data_2009', 'data_2010', 'data_2011', 'data_2012', 'data_2013', 'data_2014', 'data_2015', 'data_2016', 'data_2017'] 
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/woodandwaste?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
            assert(response.ok)

    def test14(self):
        response = requests.request("GET", url + "api/congresses")
        models = response.json()
        attrs = ['member_id', 'chamber', 'con_num']
        total_pages = models['total_pages']
        for i in range(total_pages):
            response = requests.request("GET", url + "api/congresses?page=" + str(i))
            models = response.json()
            for m in models['objects']:
                for a in attrs:
                    assert(a in m)
                assert(m['chamber'] == 'house' or m['chamber'] == 'senate')

class BackEndTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.members = propublica_data.get_members()
        cls.bills = propublica_data.get_bills()
        cls.states = state_data.get_states()
        cls.congresses = con_num.get_congresses()

    def test1(self):
        assert(type(self.members) is pandas.core.frame.DataFrame)

    def test2(self):
        attrs = ['id', 'first_name', 'last_name', 'date_of_birth', 'party', 'state', 'district', 'votes_with_party_pct', 'office', 'twitter_account', 'title', 'facebook_account', 'phone', 'url', 'cspan_id', 'image_url']
        for index, row in self.members.iterrows():
            for a in attrs:
                assert(a in row) 
    
    def test3(self):
        assert(type(self.bills) is pandas.core.frame.DataFrame)
   
    def test4(self):
        attrs = ['bill_id', 'bill_type', 'title', 'short_title', 'sponsor_id', 'introduced_date', 'cosponsors_by_party_D', 'cosponsors_by_party_R', 'committees', 'active', 'congressdotgov_url', 'house_passage', 'senate_passage', 'summary', 'summary_short']
        for index, row in self.bills.iterrows():
            for a in attrs:
                assert(a in row) 
         
    def test5(self):
        assert(type(self.states) is tuple) 

    def test6(self):
        assert(type(self.congresses) is pandas.core.frame.DataFrame)

    def test7(self):
        attrs = ['member_id', 'chamber_name', 'con_num']
        for index, row in self.congresses.iterrows():
            for a in attrs:
                assert(a in row) 

    def test8(self):
        for index, row in self.congresses.iterrows():
            assert(row['chamber_name'] == 'house' or row['chamber_name' == 'senate'])
    
if __name__ == "__main__":
    unittest.main()
