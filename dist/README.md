# Boom Summary Panel for Grafana

Boom Summary Panel for Grafana.

**Disclaimer** This plugin is still in development and may contain bugs. DONT USE IN PRODUCTION. There may be breaking changes.

## Screenshots

**Output** 

![image](https://user-images.githubusercontent.com/153843/53750112-df169780-3ea0-11e9-9eff-f6159d4b6f4b.png)

**Editor**

![image](https://user-images.githubusercontent.com/153843/53750359-75e35400-3ea1-11e9-9a03-3001198bf9ee.png)

![image](https://user-images.githubusercontent.com/153843/53750150-f3f32b00-3ea0-11e9-9f84-deb8c63b4db0.png)

![image](https://user-images.githubusercontent.com/153843/53750323-5ea46680-3ea1-11e9-8d85-3c8108cc9b3c.png)

![image](https://user-images.githubusercontent.com/153843/53750202-0ff6cc80-3ea1-11e9-8c0a-ab987b95a798.png)

## How to

**Quick route:**

* Click **Auto Generate Stats** button to automatically fill stats.

**Manual:**

* Add Stat using the `+ Add` button in the stats tab of editor
* Enter the columnn name from the table in `Field` textbox
* Optinally Enter the output format in `Output template` field. In the template you can type the name of the stats you want to see using tokens. Valid tokens and stats given below.  Output template can have HTML. By default `${default}` stat will be selected which is equivalent to table's first rows selected `${field}`.
* Optionally apply units and decimal values
* Optionally apply filters to filter out rows based on condition
* Optionally apply thresholds and transformation using `Conditional formats` field
* Refer [here](https://github.com/yesoreyeram/yesoreyeram-boomsummary-panel/issues/1) for more examples

## Output template

Output template can be in HTML format. Some of the sample template are given below.

| Template | Output |
| ---- | ---|
| *Default Template* `<div style="width:100%;float:left;"><div style="width:50%;float:left;padding:10px;border:1px solid black;">${title}</div><div style="width:50%;float:left;padding:10px;border:1px solid black;">${count}</div></div>` | ![image](https://user-images.githubusercontent.com/153843/53751219-b9d75880-3ea3-11e9-82e7-1f43e56e0213.png) |
| `<div style="width:100%;float:left;text-align:center"><br/><h5>Total VMs</h5><h1>${count}</h1><br/></div>`| ![image](https://user-images.githubusercontent.com/153843/53751210-b348e100-3ea3-11e9-9ce5-08035c206c35.png) |


## Tokens

Templates can contain token which will be automatically replaced at runtime.

| Token name            | Output                                                    |
| ----------------------|-----------------------------------------------------------|
|  **Values Formatted** |                                                           |
| `${first}`            | First column of the selected field.                       | 
| `${min}`              | Minimum value of the selected field                       | 
| `${max}`              | Maximum value of the selected field                       | 
| `${mean}`             | Mean value of the selected field                          | 
| `${sum}`              | Sum value of the selected field                           | 
| `${count}`            | Number of matching rows.                                  | 
| `${uniquecount}`      | Unique number of results for the matching field.          | 
| `${default}`          | Configured default stat OR ${first}                       | 
|  **Raw values**       |                                                           |
| `${first_raw}`        | First column of the selected field without units.         | 
| `${min_raw}`          | Minimum value of the selected field without units.        | 
| `${max_raw}`          | Maximum value of the selected field without units.        | 
| `${mean_raw}`         | Mean value of the selected field without units.           | 
| `${sum_raw}`          | Sum value of the selected field without units.            | 
| `${count_raw}`        | Number of matching rows without units.                    | 
| `${uniquecount_raw}`  | Unique number of results for the field without units.     | 
| `${default_raw}`      | Configured default stat OR ${first} without units.        | 
| **Special Items**     |                                                           |
| `${title}`            | Title of the stat                                         | 
| `${field}`            | Column Name of the stat                                   | 
| `${bgColor}`          | BG Color value of the stat                                | 
| `${textColor}`        | Text Color value of the stat                              |

## Filters

Optionally table rows can be filtered using the `Filters` option. If more than one filter specified, rows will be considered only if all the conditions satisified.

Example:

![image](https://user-images.githubusercontent.com/153843/53824458-e191f380-3f6b-11e9-9d90-66648d0a7de2.png)

Above settings give count of machine in north region with 4 cores. 


## Conditional Formats

Optionally you can format the output using multiple conditions.

![image](https://user-images.githubusercontent.com/153843/53824805-b4921080-3f6c-11e9-9707-cd60c69e6199.png)

Above settings shows three different thresholds set. If none of the condition match, default settings (bgcolor, textcolor) will be applied

![image](https://user-images.githubusercontent.com/153843/53824945-105c9980-3f6d-11e9-9458-56343508ada2.png)

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

## Repeater / Group By column

If you need the summary panel to repeat for multiple values, you can use this option to repeat panel. With this approach, you don't need multiple queries. With a single query, you can group rows by specific column. More details available [here](https://github.com/yesoreyeram/yesoreyeram-boomsummary-panel/issues/1#issuecomment-482051979)

![image](https://user-images.githubusercontent.com/153843/55948852-487c8980-5c49-11e9-80e0-da2be23acc2a.png)

![image](https://user-images.githubusercontent.com/153843/55948873-4f0b0100-5c49-11e9-9dd4-3ddbca898edb.png)


## Auto Generate Stats

If no existing stats are available, **Auto Generate all stats** button will be visible. If clicked, panel will automatically construct stats from the metric results.

If metrics tab doesn't result any data or have no queries/results, **Auto Generate all stats** will not work. You may need to refresh metrics.

![image](https://user-images.githubusercontent.com/153843/53822354-7ba36d00-3f67-11e9-93b5-ab91b4cabc8d.png)

## Font Awesome Icons

Output templates can have font awesome icons. Refer [here](https://github.com/yesoreyeram/yesoreyeram-boomsummary-panel/issues/1#issuecomment-469771047)

Samples : ` ${fa-arrow-up} ` , ` ${fa-arrow-down,red} `, ` ${fa-circle,yellow,3,plus,2} ` , ` ${fa-circle,yellow,${uniquecount_raw},multiply,1.5} `, ` ${fa-circle,yellow,${uniquecount_raw},min,${sum_raw}}  `

Usage info : ` ${fa-circle,yellow,5,multiply,1.25} ` will repeat yellow circle icon 6 times i.e., ( Math.round(5*1.25) )

**TOKEN 0** : Icon Name Refer [Font Awesome official page](https://fontawesome.com/icons)

**TOKEN 1** : Color of the icon

**TOKEN 2** : Repeat count

**TOKEN 3** : Repeat count operator. Needs token 2 and 4. Valid operators are `plus`, `minus`, `multiply`, `divideby`, `min`, `max` and `mean`

**TOKEN 4** : Repat count value 2.

**Note:**

* Font awesome token needs to surrounded by whitespace.
* IMPORTANT : Use **raw values** when repeating icons using calculations.

![image](https://user-images.githubusercontent.com/153843/53824039-f28e3500-3f6a-11e9-9bc8-e7fc51f533d1.png)

