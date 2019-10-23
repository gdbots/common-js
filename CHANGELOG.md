# CHANGELOG


## v1.0.2
* Remove createSlug functionality that surrounded digits with dashes (`-`).
* Don't use lodash trim with regex in createSlug because it trims `g` character.


## v1.0.1
* Fix createSlug bug that was turning `2019/04/02` into `2019/-04/-2`.


## v1.0.0
* Tag first stable version.


## v0.1.2
* Update isValidUrl and isValidUri to always return a boolean value.


## v0.1.1
* Update isValidSlug to correctly return `false` for strings that end with `-` or `/`.


## v0.1.0
* initial version
