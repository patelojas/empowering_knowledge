import sqlalchemy as db
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, select, Float, Boolean

import state_data as s_data
import propublica_data as p_data

engine = db.create_engine('mysql+pymysql://admin:SWEswe-123@empowering-db.ccanwhd1wsdp.us-east-1.rds.amazonaws.com:3306/empowering_db1')
connection = engine.connect()
meta = MetaData()

def view_table_names():
	print(engine.table_names())

def create_congress_table():

	con_mem = Table(
		'CongressMember2', meta,
		Column('member_id', String(16), primary_key=True, autoincrement=False),
		Column('first_name', String(16)), 
		Column('last_name', String(20)), 
		Column('date_of_birth', String(10)),
		Column('party', String(1)), 
		Column('state_abr', String(2)), 
		Column('state', String(30)),
		Column('district', String(20)), 
		Column('votes_with_party_pct', String(10)),
		Column('office', String(125)), 
		Column('twitter_account', String(30)), 
		Column('title', String(30)), 
		Column('facebook_account', String(50)), 
		Column('phone', String(12)), 
		Column('url', String(100)), 
		Column('cspan_id', String(50)),
		Column('image_url', String(250)),
		)

	meta.create_all(engine)

	df = p_data.get_members()

	for index, row in df.iterrows():
		print("Insert")
		ins = con_mem.insert().values(member_id = row['id'], first_name = row['first_name'], 
			last_name = row['last_name'], 
			date_of_birth = row['date_of_birth'], 
			party = row['party'], state_abr = row['state'], state = row['full_state'],
			district = row['district'], votes_with_party_pct = str(row['votes_with_party_pct']), 
			office = row['office'], twitter_account = row['twitter_account'], 
			title = row['title'], facebook_account = row['facebook_account'],
			phone = row['phone'], url = row['url'], 
			cspan_id = row['cspan_id'], image_url = row['image_url'])

		conn = engine.connect()
		conn.execute(ins)

def create_state_tables():

	petroleum = Table(
		'Petroleum2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	biomass = Table(
		'Biomass2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	coal = Table(
		'Coal2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	geothermal = Table(
		'Geothermal2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	hydroelectricity = Table(
		'Hydroelectricity2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	nat_gas = Table(
		'NaturalGas2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	nuclear = Table(
		'NuclearPower2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	solar = Table(
		'SolarEnergy2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	wind = Table(
		'WindEnergy2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	wnw = Table(
		'WoodAndWaste2', meta,
		Column('state_name', String(16), primary_key=True, autoincrement=False),
		Column('data_1993', Integer),
		Column('data_1994', Integer),
		Column('data_1995', Integer),
		Column('data_1996', Integer),
		Column('data_1997', Integer),
		Column('data_1998', Integer),
		Column('data_1999', Integer),
		Column('data_2000', Integer),
		Column('data_2001', Integer),
		Column('data_2002', Integer),
		Column('data_2003', Integer),
		Column('data_2004', Integer),
		Column('data_2005', Integer),
		Column('data_2006', Integer),
		Column('data_2007', Integer),
		Column('data_2008', Integer),
		Column('data_2009', Integer),
		Column('data_2010', Integer),
		Column('data_2011', Integer),
		Column('data_2012', Integer),
		Column('data_2013', Integer),
		Column('data_2014', Integer),
		Column('data_2015', Integer),
		Column('data_2016', Integer),
		Column('data_2017', Integer),
		)

	states = Table(
		'State2', meta,
		Column('name', String(16), primary_key=True, autoincrement=False),
		Column('population', Integer),
		Column('median_hh_income', Integer),
		Column('dominant_party', String(20)),
		Column('primary_energy_source_1', String(40)),
		Column('primary_energy_source_2', String(40)),
		Column('primary_energy_source_3', String(40)),
		Column('current_politicians', String(40)),
		Column('bills_sponsored', String(40)),
		)
	"""
	may not need these since state names will be the same across all the tables?
	Column('petroleum_key', Integer, ForeignKey('Petroleum.state_name'), nullable=False),
	Column('biomass_key', Integer, ForeignKey('Biomass.state_name'), nullable=False),
	Column('coal_key', Integer, ForeignKey('Coal.state_name'), nullable=False),
	Column('geothermal_key', Integer, ForeignKey('Geothermal.state_name'), nullable=False),
	Column('hydroelectricity_key', Integer, ForeignKey('Hydroelectricity.state_name'), nullable=False),
	Column('naturalgas_key', Integer, ForeignKey('NaturalGas.state_name'), nullable=False),
	Column('solarenergy_key', Integer, ForeignKey('SolarEnergy.state_name'), nullable=False),
	Column('windenergy_key', Integer, ForeignKey('WindEnergy.state_name'), nullable=False),
	Column('woodandwaste_key', Integer, ForeignKey('WoodAndWaste.state_name'), nullable=False)
	"""

	meta.create_all(engine)

	(base_state_df, df_dict) = s_data.get_states()

	# df_dict contains <energy type>: DataFrame, DataFrame has columns for state name & 1993-2017
	for en_type in df_dict:
		table = None
		# set table pointer
		if (en_type == 'All Petroleum Products'):
			table = petroleum
		elif (en_type == 'Biomass'):
			table = biomass
		elif (en_type == 'Coal'):
			table = coal
		elif (en_type == 'Geothermal'):
			table = geothermal
		elif (en_type == 'Hydroelectricity'):
			table = hydroelectricity
		elif (en_type == 'Natural Gas excluding Supplemental Gaseous Fuels'):
			table = nat_gas
		elif (en_type == 'Nuclear Power'):
			table = nuclear
		elif (en_type == 'Solar Energy'):
			table = solar
		elif (en_type == 'Wind Energy'):
			table = wind
		else:
			table = wnw

		for index, row in df_dict[en_type].iterrows():
			ins = table.insert().values(state_name = row['Name'], 
				data_1993 = row['1993'], data_1994 = row['1994'], data_1995 = row['1995'], data_1996 = row['1996'],
				data_1997 = row['1997'], data_1998 = row['1998'], data_1999 = row['1999'], data_2000 = row['2000'],
				data_2001 = row['2001'], data_2002 = row['2002'], data_2003 = row['2003'], data_2004 = row['2004'],
				data_2005 = row['2005'], data_2006 = row['2006'], data_2007 = row['2007'], data_2008 = row['2008'],
				data_2009 = row['2009'], data_2010 = row['2010'], data_2011 = row['2011'], data_2012 = row['2012'],
				data_2013 = row['2013'], data_2014 = row['2014'], data_2015 = row['2015'], data_2016 = row['2016'],
				data_2017 = row['2017'])

			conn = engine.connect()
			conn.execute(ins)

	for index, row in base_state_df.iterrows():
		ins = states.insert().values(name = row['Name'],
			population = row['Population'],
			median_hh_income = row['Median_HH_Income'])
		# may need to add foreign keys to the State table, but it should be easy to find the records
		# in the various energy data tables since they use the same primary key (state name)
		conn = engine.connect()
		conn.execute(ins)


def create_bills_table():

	bills = Table(
		'Bills2', meta,
		Column('bill_id', String(16), primary_key=True, autoincrement=False),
		Column('bill_type', String(30)),
		Column('title', String(2500)),
		Column('short_title', String(1000)),
		Column('sponsor_id', String(30)),
		Column('introduced_date', String(30)),
		Column('cosponsors_by_party_R', Integer),
		Column('cosponsors_by_party_D', Integer),
		Column('committees', String(2500)), 
		Column('active', Boolean),
		Column('congressdotgov_url', String(100)),
		Column('govtrack_url', String(100)),
		Column('house_passage', String(75)),
		Column('senate_passage', String(75)),
		Column('summary', String(15000)),
		Column('summary_short', String(10000))
		)

	meta.create_all(engine)

	df = p_data.get_bills()

	for index, row in df.iterrows():
		print("Insert")
		ins = bills.insert().values(bill_id = row['bill_id'], bill_type = row['bill_type'],
			title = row['title'], short_title = row['short_title'], sponsor_id = row['sponsor_id'],
			introduced_date = row['introduced_date'], cosponsors_by_party_R = str(row['cosponsors_by_party_R']),
			cosponsors_by_party_D = str(row['cosponsors_by_party_D']), committees = row['committees'],
			active = row['active'], congressdotgov_url = row['congressdotgov_url'],
			house_passage = row['house_passage'], senate_passage = row['senate_passage'],
			summary = row['summary'], summary_short = row['summary_short'])

		conn = engine.connect()
		conn.execute(ins)

# view values in the table
def view():
	select_st = select([students]).where(
	   students.c.lastname == 'Doe')
	res = conn.execute(select_st)
	for _row in res:
		print(_row)

