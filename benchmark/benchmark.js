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

// MODULES //

var bench = require( '@stdlib/bench-harness' );
var uniform = require( '@stdlib/random-base-uniform' ).factory;
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var pow = require( '@stdlib/math-base-special-pow' );
var floor = require( '@stdlib/math-base-special-floor' );
var add = require( '@stdlib/number-float64-base-add' );
var filled3dBy = require( '@stdlib/array-base-filled3d-by' );
var zeros3d = require( '@stdlib/array-base-zeros3d' );
var numel = require( '@stdlib/ndarray-base-numel' );
var pkg = require( './../package.json' ).name;
var binary3d = require( './../lib' );


// FUNCTIONS //

/**
* Creates a benchmark function.
*
* @private
* @param {PositiveIntegerArray} shape - array shape
* @returns {Function} benchmark function
*/
function createBenchmark( shape ) {
	var arrays;
	var x;
	var y;
	var z;

	x = filled3dBy( shape, uniform( -100.0, 100.0 ) );
	y = filled3dBy( shape, uniform( -100.0, 100.0 ) );
	z = zeros3d( shape );

	arrays = [ x, y, z ];

	return benchmark;

	/**
	* Benchmark function.
	*
	* @private
	* @param {Benchmark} b - benchmark instance
	*/
	function benchmark( b ) {
		var i0;
		var i1;
		var i2;
		var i;

		b.tic();
		for ( i = 0; i < b.iterations; i++ ) {
			binary3d( arrays, shape, add );
			i2 = i % shape[ 0 ];
			i1 = i % shape[ 1 ];
			i0 = i % shape[ 2 ];
			if ( isnan( arrays[ 2 ][ i2 ][ i1 ][ i0 ] ) ) {
				b.fail( 'should not return NaN' );
			}
		}
		b.toc();

		i2 = i % shape[ 0 ];
		i1 = i % shape[ 1 ];
		i0 = i % shape[ 2 ];
		if ( isnan( arrays[ 2 ][ i2 ][ i1 ][ i0 ] ) ) {
			b.fail( 'should not return NaN' );
		}
		b.pass( 'benchmark finished' );
		b.end();
	}
}


// MAIN //

/**
* Main execution sequence.
*
* @private
*/
function main() {
	var min;
	var max;
	var sh;
	var N;
	var f;
	var i;

	min = 1; // 10^min
	max = 6; // 10^max

	for ( i = min; i <= max; i++ ) {
		N = floor( pow( pow( 10, i ), 1.0/3.0 ) );
		sh = [ N, N, N ];
		f = createBenchmark( sh );
		bench( pkg+'::equidimensional:size='+numel( sh ), f );
	}
}

main();
