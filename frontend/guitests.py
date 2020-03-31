from selenium import webdriver
import unittest
from unittest import TestCase
import selenium
from selenium.webdriver.common.keys import Keys

import time

driver = webdriver.Chrome()
driver.get("https://www.empoweringknowledge.me")

class Gui_Tests (TestCase):

	# test link to about page on nav bar
	def test_load(self):
		driver.get("https://www.empoweringknowledge.me")
		assert driver.current_url == "https://www.empoweringknowledge.me/"

	def test_about_link(self):
		link = driver.find_element_by_link_text('About')
		link.click()
		assert driver.current_url == "https://www.empoweringknowledge.me/about"

	# test link to politician page on nav bar
	def test_politician_link(self):
		link = driver.find_element_by_link_text("Politicians")
		link.click()
		assert driver.current_url == "https://www.empoweringknowledge.me/politicians"

	# test link to states page on nav bar
	def test_states_link(self):
		link = driver.find_element_by_link_text("States")
		link.click()
		assert driver.current_url == "https://empoweringknowledge.me/states"

	# test link to energy bills page on nav bar
	def test_energy_bills_link(self):
		link = driver.find_element_by_link_text("Energy Bills")
		link.click()
		assert driver.current_url == "https://www.empoweringknowledge.me/bills"
		

	# test link to splash page on nav bar
	def test_splash_page_link(self):
		link = driver.find_element_by_link_text("Empowering Knowledge")
		link.click()
		assert driver.current_url == "https://empoweringknowledge.me/"


	def test_politican_click(self):
		link = driver.find_element_by_link_text("Politicians")
		link.click()
		driver.implicitly_wait(10)
		link = driver.find_element_by_link_text("See More")
		link.click()

		curr_url = driver.current_url
		val = curr_url.split("/")
		assert val[3] == "politician"


	def test_states_click(self):
		link = driver.find_element_by_link_text("States")
		link.click()
		driver.implicitly_wait(10)
		link = driver.find_element_by_link_text("See More")
		link.click()

		curr_url = driver.current_url
		val = curr_url.split("/")
		assert val[3] == "state"
		
	# tests to see if the pagination model is correctly displayed on the Politicians page
	def test_pagination_length_politician(self):
		link = driver.find_element_by_link_text("Politicians")
		link.click()	
		driver.implicitly_wait(10)
		link = driver.find_elements_by_class_name('page-link')
		assert len(link) == 6

	# tests to see if the pagination model is correctly displayed on the States page
	def test_pagination_length_states(self):
		link = driver.find_element_by_link_text("States")
		link.click()
		driver.implicitly_wait(10)
		link = driver.find_elements_by_class_name('page-link')
		assert len(link) == 6

	# tests to see if the pagination model is correctly displayed on the Bills page
	def test_pagination_length_bills(self):
		link = driver.find_element_by_link_text("Energy Bills")
		link.click()
		driver.implicitly_wait(10)
		link = driver.find_elements_by_class_name('page-link')
		assert len(link) == 6

	# tests to see if we can iterate over multiple pages in the Politcians model page
	def test_pagination_politician(self):
		driver.get("https://www.empoweringknowledge.me/politicians")

		
		driver.implicitly_wait(100)
		link = driver.find_elements_by_class_name('page-link')
		link[3].click()

		curr_url = driver.current_url
		val = curr_url.split("/")
		assert val[3] == "politicians#"

	# tests to see if we can iterate over multiple pages in the States model page
	def test_pagination_states(self):
		link = driver.find_element_by_link_text("States")
		link.click()

		
		driver.implicitly_wait(10)
		link = driver.find_elements_by_class_name('page-link')
		link[3].click()

		curr_url = driver.current_url
		val = curr_url.split("/")
		assert val[3] == "states#"

	# tests to see if we can iterate over multiple pages in the Bills model page
	def test_pagination_bills(self):
		link = driver.find_element_by_link_text("Energy Bills")
		link.click()

		
		driver.implicitly_wait(10)
		link = driver.find_elements_by_class_name('page-link')
		link[3].click()

		curr_url = driver.current_url
		val = curr_url.split("/")
		assert val[3] == "bills#"

	def test_search_bills(self):
		driver.get("https://empoweringknowledge.me/about")
		link = driver.find_element_by_class_name('searchbox')
		link.click()
		link.send_keys("g")
		link.send_keys(Keys.ENTER)

		assert driver.current_url == "https://empoweringknowledge.me/results/g"

		
	def test_sort_politicians_asc(self):
		driver.get("https://empoweringknowledge.me/politicians")
		link = driver.find_element_by_class_name("btn btn-primary")
		link.click()
		
		link = driver.find_elements_by_link_text("A. McEachin")
		assert link[0] == "A. McEachin"

	def test_sort_politicians_desc(self):
		driver.get("https://empoweringknowledge.me/politicians")
		link = driver.find_elements_by_class_name("btn btn-secondary")
		link.click()

		link = driver.find_elements_by_link_text("Zoe Lofgren")
		assert link[0] == "Zoe Lofgren"

	def test_sort_state_asc(self):
		driver.get("https://empoweringknowledge.me/states")
		link = driver.find_element_by_class_name("btn btn-primary")
		link.click()
		
		link = driver.find_elements_by_link_text("Alabama")
		assert link[0] == "Alabama"

	def test_sort_state_desc(self):
		driver.get("https://empoweringknowledge.me/states")
		link = driver.find_elements_by_class_name("btn btn-secondary")
		link.click()

		link = driver.find_elements_by_link_text("Wyoming")
		assert link[0] == "Wyoming"

	def test_filter_party_state_d(self):
		driver.get("https://empoweringknowledge.me/states")
		link = driver.find_element_by_link_text("Filter by Party: None")
		link.click()
		link = driver.find_elements_by_link_text("Democratic")
		link.click()

		link = driver.find_elements_by_link_text("California")
		assert link[0] == "California"

	def test_filter_party_state_r(self):
		driver.get("https://empoweringknowledge.me/states")
		link = driver.find_element_by_link_text("Filter by Party: None")
		link.click()
		link = driver.find_elements_by_link_text("Republican")
		link.click()

		link = driver.find_elements_by_link_text("Alabama")
		assert link[0] == "Alabama"

	def test_filter_population_state(self):
		driver.get("https://empoweringknowledge.me/states")
		link = driver.find_element_by_link_text("Filter by Population: None")
		link.click()
		link = driver.find_elements_by_link_text("1 - 999,999")
		link.click()

		link = driver.find_elements_by_link_text("Alaska")
		assert link[0] == "Alaska"

	def test_filter_income_state(self):
		driver.get("https://empoweringknowledge.me/states")
		link = driver.find_element_by_link_text("Filter by Income: None")
		link.click()
		link = driver.find_elements_by_link_text("50,000 - 59,999")
		link.click()

		link = driver.find_elements_by_link_text("South Dakota")
		assert link[0] == "South Dakota"

	def test_filter_energy_state(self):
		driver.get("https://empoweringknowledge.me/states")
		link = driver.find_element_by_link_text("Filter by Energy: None")
		link.click()
		link = driver.find_elements_by_link_text("Hydroelectricity")
		link.click()

		link = driver.find_elements_by_link_text("Vermont")
		assert link[0] == "Vermont"

	# tests the gitlab link on the about page
	def test_gitlab(self):
		link = driver.find_element_by_link_text("About")

		link.click()

		link_git = driver.find_element_by_link_text("GitLab Repo")
		link_git.click()

		curr_url = driver.curr_url 
		driver.get("https://www.empoweringknowledge.me")
		assert curr_url == "https://www.gitlab.com/patelojasv/cs373-web"


	# tests the postman link on the about page
	def test_postman(self):
		link = driver.find_element_by_link_text("About")
		link.click()
		link_post = driver.find_element_by_link_text("Postman Documentation API")

		link_post.click()

		curr_url = driver.curr_url
		driver.get("https://www.empoweringknowledge.me")
		assert curr_url == "https://www.gitlab.com/patelojasv/cs373-web"

		

	def shutdown(self):
		driver.close()
	

if __name__ == "__main__":
	unittest.main()
