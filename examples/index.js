/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var discreteUniform = require( '@stdlib/random-base-discrete-uniform' ).factory;
var filled3dBy = require( '@stdlib/array-base-filled3d-by' );
var zeros3d = require( '@stdlib/array-base-zeros3d' );
var add = require( '@stdlib/number-float64-base-add' );
var binary3d = require( './../lib' );

var shape = [ 2, 3, 3 ];

var x = filled3dBy( shape, discreteUniform( -100, 100 ) );
console.log( x );

var y = filled3dBy( shape, discreteUniform( -100, 100 ) );
console.log( y );

var z = zeros3d( shape );
console.log( z );

binary3d( [ x, y, z ], shape, add );
console.log( z );
