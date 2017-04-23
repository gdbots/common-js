'use strict';

/**
 * HashtagUtils has methods for converting text to a hashtag
 * and finding/validating hash tags.
 *
 * Current version does NOT support international hashtags.
 *
 * #hashtags how do they work?  magnets?
 *
 * #############
 * #### Rule below doesn't seem to be a rule anymore.  twitter does allow for hashtags
 * #### with leading numbers.  #2cellos or #50cent or #2014lol
 * #### - result must start with a letter (leading numbers are automatically removed) #####
 * #############
 *
 * - result must have at least one letter
 * - result cannot start with an underscore (leading _ automatically removed)
 * - all special chars and accent chars removed
 *      Beyoncé Knowles becomes BeyonceKnowles (makes it url friendly)
 * - result cannot be greater than 139 characters
 *
 * @see http://twitter.pbworks.com/w/page/1779812/Hashtags
 *
 */
export default class HashtagUtils
{
  /**
   * Returns true if the provided hashtag conforms to the rules.
   *
   * @param string hashtag
   *
   * @return bool
   */
  static isValid(hashtag) {
    return hashtag.length < 140 && /^#[a-z\d][\w-]*/.test(hashtag);
  }

  // @todo: add additional functions
}
