/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
import { InMemoryCache, makeVar } from '@apollo/client';
export var cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read: function () {
                        return isLoggedInVar();
                    }
                },
                accessToken: {
                    read: function () {
                        return accessToken();
                    }
                },
                newPatientCache: {
                    read: function () {
                        return newPatientCache();
                    }
                }
            }
        }
    }
});
// Initializes to true if sessionStorage includes a 'accessToken' key,
// false otherwise
export var isLoggedInVar = makeVar(!!sessionStorage.getItem('accessToken'));
export var accessToken = makeVar(sessionStorage.getItem('accessToken'));
export var newPatientCache = makeVar(null);
