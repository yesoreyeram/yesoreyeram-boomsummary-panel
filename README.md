# Boom Summary Panel for Grafana

Boom Summary Panel for Grafana. Transform table data into summary.

## Screenshots

**Output** 

![image](https://user-images.githubusercontent.com/153843/56358661-35346580-61d7-11e9-9493-d572158706d5.png)

## How to

**Step 1** : Click "add summary group" button

![image](https://user-images.githubusercontent.com/153843/56359152-9c9ee500-61d8-11e9-9fea-fd3228efa4a8.png)

**Step 2** : Choose metric / stat

![image](https://user-images.githubusercontent.com/153843/56359233-e091ea00-61d8-11e9-90fe-44ce979fa10f.png)

**Step 3** (Optional): Choose Template format

![image](https://user-images.githubusercontent.com/153843/56359314-2189fe80-61d9-11e9-82a6-4143c95cb84b.png)

**Step 4** (Optional): Apply filter to the data

![image](https://user-images.githubusercontent.com/153843/56358768-8fcdc180-61d7-11e9-8ce4-358cf6d5fa81.png)

**Step 5** (Optional): Apply conditional formats

![image](https://user-images.githubusercontent.com/153843/56358768-8fcdc180-61d7-11e9-8ce4-358cf6d5fa81.png)

**Step 6** (Optional): Add more stats within the same data / same summary group

![image](https://user-images.githubusercontent.com/153843/56359500-a8d77200-61d9-11e9-9bea-8843af2c24aa.png)

**Step 7** (Optional): Add more stats with differnt data set / new summary groups using "Add Summary Group" button

![image](https://user-images.githubusercontent.com/153843/56359570-d2909900-61d9-11e9-8252-294c1a5a6e11.png)


## Templates

You can use templates with the type of plain text, HTML, HTML with styles tags. Following templates are available

| Template Type | Detail |
| ------|-----|
| Auto Template | Automatically generates title and value from stats |
| Jumbo Stat | Title and Value of the first stat in bigger size |
| Jumbo stat w/o title | Value of the first stat in bigger size |
| Value only | Value of the first stat in regular size |
| Custom template | Define your own template |


## Tokens in templates

You can use tokens to represent computed data, dynamic icons, images etc. 

| Token | value |
|-------|-------|
| `#{title}`   | Title of the first stat |
| `#{default}` | Value of the first stat with units and decimals |
| `#{statType,fieldName}`  | Stat of the given field with units. StatType can be `sum`,`min`,`max`,`mean`,`count`,`uniquecount`,`random`. **Example** : `#{count,VM_Name}` will represent count of values for the column `VM_Name`. Units/decimals will be available only if the stat is defined. |
| `#{statType,fieldName,raw}`  | Same as above but without unit. This can be useful when constructing URLs, Dynamic Icons, Images |
| `#{statType,fieldName,title}`  | Title of the given stat if defined |

## Filters

Optionally table rows can be filtered using the `Filters` option. If more than one filter specified, rows will be considered only if all the conditions satisified.

Example:

![image](https://user-images.githubusercontent.com/153843/56358734-70369900-61d7-11e9-8f30-df06d559aa4c.png)

Above settings give count of machines whose powerstat is not "VM Running"

## Conditional Formats

Optionally you can format the output using multiple conditions.

![image](https://user-images.githubusercontent.com/153843/56358768-8fcdc180-61d7-11e9-8ce4-358cf6d5fa81.png)

Above settings shows two different thresholds set. If none of the condition match, default settings (bgcolor, textcolor) will be applied.

Text compare operators

* `equals`
* `notequals`
* `contains`
* `notcontains`
* `startswith`
* `endswith`
* `in`

Numeric compare operators

* `==`
* `!=`
* `<`
* `<=`
* `>`
* `>=`
* `insiderange`
* `outsiderange`

## Display Options

You can set the default Background color, text color, select template, set width of the template etc with these options.

![image](https://user-images.githubusercontent.com/153843/56358786-9e1bdd80-61d7-11e9-8100-89f3a184b9e6.png)

## Repeater / Group By column

If you need the summary panel to repeat for multiple values, you can use this option to repeat panel. With this approach, you don't need multiple queries. With a single query, you can group rows by specific column. More details available [here](https://github.com/yesoreyeram/yesoreyeram-boomsummary-panel/issues/1#issuecomment-482051979).

![image](https://user-images.githubusercontent.com/153843/56364008-7af82a80-61e5-11e9-9f5a-4f1eb6f7e74f.png)

![image](https://user-images.githubusercontent.com/153843/55948873-4f0b0100-5c49-11e9-9dd4-3ddbca898edb.png)

## Custom Stylesheet

TBD![image](https://user-images.githubusercontent.com/153843/56364008-7af82a80-61e5-11e9-9f5a-4f1eb6f7e74f.png)


## Font Awesome Icons

Output templates can have font awesome icons. Refer [here](https://github.com/yesoreyeram/yesoreyeram-boomsummary-panel/issues/1#issuecomment-469771047)

Samples : ` #{fa-arrow-up} ` , ` #{fa-arrow-down,red} `, ` #{fa-circle,yellow,3,plus,2} ` , ` #{fa-circle,yellow,${uniquecount_raw},multiply,1.5} `, ` #{fa-circle,yellow,${uniquecount_raw},min,${sum_raw}}  `

Usage info : ` #{fa-circle,yellow,5,multiply,1.25} ` will repeat yellow circle icon 6 times i.e., ( Math.round(5*1.25) )

**TOKEN 0** : Icon Name Refer [Font Awesome official page](https://fontawesome.com/icons)

**TOKEN 1** : Color of the icon

**TOKEN 2** : Repeat count

**TOKEN 3** : Repeat count operator. Needs token 2 and 4. Valid operators are `plus`, `minus`, `multiply`, `divideby`, `min`, `max` and `mean`

**TOKEN 4** : Repat count value 2.

**Note:**

* Font awesome token needs to surrounded by whitespace.
* IMPORTANT : Use **raw values** when repeating icons using calculations.