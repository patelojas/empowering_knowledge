import App from './App.js';
import Navigation from './Navbar.js';
import {Route, BrowserRouter} from 'react-router-dom';
import {Representatives} from './Representatives.js';
import {About} from './About.js';
import {Home} from './Home.js';
import {States} from './States.js';
import {EnergyBills} from './EnergyBills.js';
import {RepresentativeInstance} from './RepresentativeInstance.js';
import {EnergyBillsInstance} from './EnergyBillsInstance.js';
import {StatesInstance} from './StatesInstance.js';


var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});