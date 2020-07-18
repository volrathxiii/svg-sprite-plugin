## Functions

<dl>
<dt><a href="#SVGSpriteMap">SVGSpriteMap(files)</a> ⇒ <code>String</code></dt>
<dd><p>Generates a svg spritesheet</p>
</dd>
<dt><a href="#SVGSpriteWidth">SVGSpriteWidth(spritefile)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the width of generated spritesheet</p>
</dd>
<dt><a href="#SVGSpriteHeight">SVGSpriteHeight(spritefile)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the height of generated spritesheet</p>
</dd>
<dt><a href="#SVGSpriteNames">SVGSpriteNames(spritefile)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns list of file names included in a spritesheet.</p>
</dd>
<dt><a href="#SVGFileWidth">SVGFileWidth(spritefile, file)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the width of a specific SVG item/file</p>
</dd>
<dt><a href="#SVGFileHeight">SVGFileHeight(spritefile, file)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the height of a specific SVG item/file</p>
</dd>
<dt><a href="#SVGFilePosition">SVGFilePosition(spritefile, file, [method])</a> ⇒ <code>String</code></dt>
<dd><p>Returns position coordinates of a file in a sprite</p>
</dd>
</dl>

<a name="SVGSpriteMap"></a>

## SVGSpriteMap(files) ⇒ <code>String</code>
Generates a svg spritesheet

**Kind**: global function  
**Returns**: <code>String</code> - Path of the generated spritesheet  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>String</code> | filename of svg. Use `glob` for multiple files |

**Example**  
```js
// style.scss
 $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
 .sprite {
   background-image: $spritesheet;
 }
 // outputs
 .sprite {
   background-image: url(dest/svg-sprite-99bc9a72.svg); }
```
<a name="SVGSpriteWidth"></a>

## SVGSpriteWidth(spritefile) ⇒ <code>Number</code>
Returns the width of generated spritesheet

**Kind**: global function  
**Returns**: <code>Number</code> - Spritesheet width  

| Param | Type | Description |
| --- | --- | --- |
| spritefile | <code>String</code> | reference to [SVGSpriteMap](#SVGSpriteMap) |

**Example**  
```js
// style.scss
 $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
 .sprite {
   background-image: $spritesheet;
   background-size: SVGSpriteWidth($spritesheet) SVGSpriteHeight($spritesheet)
 }
 // outputs
 .sprite {
   background-image: url(dest/svg-sprite-99bc9a72.svg);
   background-size: 3361px 3344px; }
```
<a name="SVGSpriteHeight"></a>

## SVGSpriteHeight(spritefile) ⇒ <code>Number</code>
Returns the height of generated spritesheet

**Kind**: global function  
**Returns**: <code>Number</code> - Spritesheet height  

| Param | Type | Description |
| --- | --- | --- |
| spritefile | <code>String</code> | reference to [SVGSpriteMap](#SVGSpriteMap) |

**Example**  
```js
// style.scss
 $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
 .sprite {
   background-image: $spritesheet;
   background-size: SVGSpriteWidth($spritesheet) SVGSpriteHeight($spritesheet)
 }
 // outputs
 .sprite {
   background-image: url(dest/svg-sprite-99bc9a72.svg);
   background-size: 3361px 3344px; }
```
<a name="SVGSpriteNames"></a>

## SVGSpriteNames(spritefile) ⇒ <code>Array</code>
Returns list of file names included in a spritesheet.

**Kind**: global function  
**Returns**: <code>Array</code> - Array of file names without extention  

| Param | Type | Description |
| --- | --- | --- |
| spritefile | <code>String</code> | reference to [SVGSpriteMap](#SVGSpriteMap) |

**Example**  
```js
// style.scss
 $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
 .names {
   --list: #{SVGSpriteNames($spritesheet)};
 }
 // outputs
 .names {
    --list: file1, file2, file3; }
```
<a name="SVGFileWidth"></a>

## SVGFileWidth(spritefile, file) ⇒ <code>Number</code>
Returns the width of a specific SVG item/file

**Kind**: global function  
**Returns**: <code>Number</code> - Width of a file  

| Param | Type | Description |
| --- | --- | --- |
| spritefile | <code>String</code> | reference to [SVGSpriteMap](#SVGSpriteMap) |
| file | <code>String</code> | name of an SVG file. See [SVGSpriteNames](#SVGSpriteNames) |

**Example**  
```js
// style.scss
 $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
 .style {
   width: SVGFileWidth($spritesheet, 'file3');
 }
 // outputs
 .style {
    width: 1641.48px; }
```
<a name="SVGFileHeight"></a>

## SVGFileHeight(spritefile, file) ⇒ <code>Number</code>
Returns the height of a specific SVG item/file

**Kind**: global function  
**Returns**: <code>Number</code> - height of a file  

| Param | Type | Description |
| --- | --- | --- |
| spritefile | <code>String</code> | reference to [SVGSpriteMap](#SVGSpriteMap) |
| file | <code>String</code> | name of an SVG file. See [SVGSpriteNames](#SVGSpriteNames) |

**Example**  
```js
// style.scss
 $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
 .style {
   height: SVGFileHeight($spritesheet, 'file3');
 }
 // outputs
 .style {
    height: 1641.48px; }
```
<a name="SVGFilePosition"></a>

## SVGFilePosition(spritefile, file, [method]) ⇒ <code>String</code>
Returns position coordinates of a file in a sprite

**Kind**: global function  
**Returns**: <code>String</code> - string of x and y axis  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| spritefile | <code>String</code> |  | reference to [SVGSpriteMap](#SVGSpriteMap) |
| file | <code>String</code> |  | name of an SVG file. See [SVGSpriteNames](#SVGSpriteNames) |
| [method] | <code>String</code> | <code>relative</code> | method of position [`relative`,`absolute`]. |

**Example**  
```js
// style.scss
 $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
 .style-relative {
   background-position: SVGFilePosition($spritesheet, 'circle');
 }
 .style-absolute {
   background-position: SVGFilePosition($spritesheet, 'circle', 'absolute');
 }
 // outputs
 .style-relative {
    background-position: 0 -1701.67px; }
 .style-absolute {
    background-position: 0 99.95007400794117%; }
```
