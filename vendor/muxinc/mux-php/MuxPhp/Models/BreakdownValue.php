<?php
/**
 * BreakdownValue
 *
 * PHP version 7.2
 *
 * @category Class
 * @package  MuxPhp
 * @author   Mux API team
 * @link     https://docs.mux.com
 */

/**
 * Mux API
 *
 * Mux is how developers build online video. This API encompasses both Mux Video and Mux Data functionality to help you build your video-related projects better and faster than ever before.
 *
 * The version of the OpenAPI document: v1
 * Contact: devex@mux.com
 * Generated by: https://openapi-generator.tech
 * OpenAPI Generator version: 5.0.1
 */

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

namespace MuxPhp\Models;

use \ArrayAccess;
use \MuxPhp\ObjectSerializer;

/**
 * BreakdownValue Class Doc Comment
 *
 * @category Class
 * @package  MuxPhp
 * @author   Mux API team
 * @link     https://docs.mux.com
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null  
 */
class BreakdownValue implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'BreakdownValue';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'views' => 'int',
        'value' => 'double',
        'total_watch_time' => 'int',
        'negative_impact' => 'int',
        'field' => 'string'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'views' => 'int64',
        'value' => 'double',
        'total_watch_time' => 'int64',
        'negative_impact' => 'int32',
        'field' => null
    ];

    /**
      * Array of nullable properties. Used for (de)serialization
      *
      * @var boolean[]
      */
    protected static array $openAPINullables = [
        'views' => false,
        'value' => false,
        'total_watch_time' => false,
        'negative_impact' => false,
        'field' => false
    ];

    /**
      * If a nullable field gets set to null, insert it here
      *
      * @var boolean[]
      */
    protected array $openAPINullablesSetToNull = [];

    /**
     * Array of property to type mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPITypes()
    {
        return self::$openAPITypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPIFormats()
    {
        return self::$openAPIFormats;
    }

    /**
     * Array of nullable properties
     *
     * @return array
     */
    protected static function openAPINullables(): array
    {
        return self::$openAPINullables;
    }

    /**
     * Array of nullable field names deliberately set to null
     *
     * @return boolean[]
     */
    private function getOpenAPINullablesSetToNull(): array
    {
        return $this->openAPINullablesSetToNull;
    }

    /**
     * Checks if a property is nullable
     *
     * @param string $property
     * @return bool
     */
    public static function isNullable(string $property): bool
    {
        return self::openAPINullables()[$property] ?? false;
    }

    /**
     * Checks if a nullable property is set to null.
     *
     * @param string $property
     * @return bool
     */
    public function isNullableSetToNull(string $property): bool
    {
        return in_array($property, $this->getOpenAPINullablesSetToNull(), true);
    }

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @var string[]
     */
    protected static $attributeMap = [
        'views' => 'views',
        'value' => 'value',
        'total_watch_time' => 'total_watch_time',
        'negative_impact' => 'negative_impact',
        'field' => 'field'
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'views' => 'setViews',
        'value' => 'setValue',
        'total_watch_time' => 'setTotalWatchTime',
        'negative_impact' => 'setNegativeImpact',
        'field' => 'setField'
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'views' => 'getViews',
        'value' => 'getValue',
        'total_watch_time' => 'getTotalWatchTime',
        'negative_impact' => 'getNegativeImpact',
        'field' => 'getField'
    ];

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @return array
     */
    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @return array
     */
    public static function setters()
    {
        return self::$setters;
    }

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @return array
     */
    public static function getters()
    {
        return self::$getters;
    }

    /**
     * The original name of the model.
     *
     * @return string
     */
    public function getModelName()
    {
        return self::$openAPIModelName;
    }


    /**
     * Associative array for storing property values
     *
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     *
     * @param mixed[] $data Associated array of property values
     *                      initializing the model
     */
    public function __construct(array $data = null)
    {
        // MUX: enum hack (self::) due to OAS emitting problems.
        //      please re-integrate with mainline when possible.
        //      src: https://github.com/OpenAPITools/openapi-generator/issues/9038
        $this->setIfExists('views', $data ?? [], null);
        $this->setIfExists('value', $data ?? [], null);
        $this->setIfExists('total_watch_time', $data ?? [], null);
        $this->setIfExists('negative_impact', $data ?? [], null);
        $this->setIfExists('field', $data ?? [], null);
    }

    /**
    * Sets $this->container[$variableName] to the given data or to the given default Value; if $variableName
    * is nullable and its value is set to null in the $fields array, then mark it as "set to null" in the
    * $this->openAPINullablesSetToNull array
    *
    * @param string $variableName
    * @param array  $fields
    * @param mixed  $defaultValue
    */
    private function setIfExists(string $variableName, array $fields, $defaultValue): void
    {
        if (self::isNullable($variableName) && array_key_exists($variableName, $fields) && is_null($fields[$variableName])) {
            $this->openAPINullablesSetToNull[] = $variableName;
        }

        $this->container[$variableName] = $fields[$variableName] ?? $defaultValue;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        return $invalidProperties;
    }

    /**
     * Validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid()
    {
        return count($this->listInvalidProperties()) === 0;
    }


    /**
     * Gets views
     *
     * @return int|null
     */
    public function getViews()
    {
        return $this->container['views'];
    }

    /**
     * Sets views
     *
     * @param int|null $views views
     *
     * @return self
     */
    public function setViews($views)
    {

        if (is_null($views)) {
            throw new \InvalidArgumentException('non-nullable views cannot be null');
        }

        $this->container['views'] = $views;

        return $this;
    }

    /**
     * Gets value
     *
     * @return double|null
     */
    public function getValue()
    {
        return $this->container['value'];
    }

    /**
     * Sets value
     *
     * @param double|null $value value
     *
     * @return self
     */
    public function setValue($value)
    {

        if (is_null($value)) {
            throw new \InvalidArgumentException('non-nullable value cannot be null');
        }

        $this->container['value'] = $value;

        return $this;
    }

    /**
     * Gets total_watch_time
     *
     * @return int|null
     */
    public function getTotalWatchTime()
    {
        return $this->container['total_watch_time'];
    }

    /**
     * Sets total_watch_time
     *
     * @param int|null $total_watch_time total_watch_time
     *
     * @return self
     */
    public function setTotalWatchTime($total_watch_time)
    {

        if (is_null($total_watch_time)) {
            throw new \InvalidArgumentException('non-nullable total_watch_time cannot be null');
        }

        $this->container['total_watch_time'] = $total_watch_time;

        return $this;
    }

    /**
     * Gets negative_impact
     *
     * @return int|null
     */
    public function getNegativeImpact()
    {
        return $this->container['negative_impact'];
    }

    /**
     * Sets negative_impact
     *
     * @param int|null $negative_impact negative_impact
     *
     * @return self
     */
    public function setNegativeImpact($negative_impact)
    {

        if (is_null($negative_impact)) {
            throw new \InvalidArgumentException('non-nullable negative_impact cannot be null');
        }

        $this->container['negative_impact'] = $negative_impact;

        return $this;
    }

    /**
     * Gets field
     *
     * @return string|null
     */
    public function getField()
    {
        return $this->container['field'];
    }

    /**
     * Sets field
     *
     * @param string|null $field field
     *
     * @return self
     */
    public function setField($field)
    {

        if (is_null($field)) {
            throw new \InvalidArgumentException('non-nullable field cannot be null');
        }

        $this->container['field'] = $field;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     *
     * @param integer $offset Offset
     *
     * @return boolean
     */
    public function offsetExists($offset): bool
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     *
     * @param integer $offset Offset
     *
     * @return mixed|null
     */
    #[\ReturnTypeWillChange]
    public function offsetGet($offset)
    {
        return $this->container[$offset] ?? null;
    }

    /**
     * Sets value based on offset.
     *
     * @param int|null $offset Offset
     * @param mixed    $value  Value to be set
     *
     * @return void
     */
    public function offsetSet($offset, $value): void
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     *
     * @param integer $offset Offset
     *
     * @return void
     */
    public function offsetUnset($offset): void
    {
        unset($this->container[$offset]);
    }

    /**
     * Serializes the object to a value that can be serialized natively by json_encode().
     * @link https://www.php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return mixed Returns data which can be serialized by json_encode(), which is a value
     * of any type other than a resource.
     */
    #[\ReturnTypeWillChange]
    public function jsonSerialize()
    {
       return ObjectSerializer::sanitizeForSerialization($this);
    }

    /**
     * Gets the string presentation of the object
     *
     * @return string
     */
    public function __toString(): string
    {
        return json_encode(
            ObjectSerializer::sanitizeForSerialization($this),
            JSON_PRETTY_PRINT
        );
    }

    /**
     * Gets a header-safe presentation of the object
     *
     * @return string
     */
    public function toHeaderValue(): string
    {
        return json_encode(ObjectSerializer::sanitizeForSerialization($this));
    }
}

