'use strict';

import FromArray from 'gdbots/common/from-array';
import ToArray from 'gdbots/common/to-array';
import SystemUtils from 'gdbots/common/util/system-utils';

/**
 * Represents a GeoJson Point value.
 *
 * @link http://geojson.org/geojson-spec.html#point
 */
export default class GeoPoint extends SystemUtils.mixinClass(null, FromArray, ToArray)
{
  /**
   * @param float lat
   * @param float lon
   *
   * @throws \InvalidArgumentException
   */
  constructor(lat, lon) {
    super(); // require before using `this`

    /** @var float */
    this.latitude = parseFloat(lat);

    /** @var float */
    this.longitude = parseFloat(lon);

    if (this.latitude > 90.0 || this.latitude < -90.0) {
      throw new Error('Latitude must be within range [-90.0, 90.0]');
    }

    if (this.longitude > 180.0 || this.longitude < -180.0) {
      throw new Error('Longitude must be within range [-180.0, 180.0]');
    }
  }

  /**
   * @return float
   */
  getLatitude() {
    return this.latitude;
  }

  /**
   * @return float
   */
  getLongitude() {
    return this.longitude;
  }

  /**
   * {@inheritdoc}
   */
  static fromArray(data = {}) {
    if (undefined !== data.coordinates) {
      return new this(data.coordinates[1], data.coordinates[0]);
    }

    throw new Error('Payload must be a GeoJson "Point" type.');
  }

  /**
   * {@inheritdoc}
   */
  toArray() {
    return {
      'type': 'Point',
      'coordinates': [this.longitude, this.latitude]
    };
  }

  /**
   * @param string string A string with format lat,long
   * @return self
   */
  static fromString(string) {
    string = string.split(',');

    return new this(string[0], string[1]);
  }

  /**
   * @return string
   */
  toString() {
    return this.latitude + ',' + this.longitude;
  }
}
