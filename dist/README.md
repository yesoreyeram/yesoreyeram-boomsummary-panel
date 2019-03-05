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

* Add Stat using the `+ Add` button in the stats tab of editor or click **Auto Generate Stats** button to automatically fill stats.
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

| Token name      | Output                                                    |
| ----------------|-----------------------------------------------------------|
| `${default}`    | First column of the selected field.                       | 
| `${value}`      | First column of the selected field.                       | 
| `${count}`      | Number of matching rows.                                  | 
| `${uniquecount}`| Unique number of results for the matching field.          | 
| `${sum}`        | Sum value of the selected field                           | 
| `${mean}`       | Mean value of the selected field                          | 
| `${min}`        | Minimum value of the selected field                       | 
| `${max}`        | Maximum value of the selected field                       | 
| `${title}`      | Title of the stat                                         | 
| `${field}`      | Column Name of the stat                                   | 
| `${bgColor}`    | BG Color value of the stat                                | 
| `${textColor}`  | Text Color value of the stat                              | 


## Filters

TBD

## Conditional Formats

TBD


## Auto Generate Stats

If no existing stats are available, **Auto Generate all stats** button will be visible. If clicked, panel will automatically construct stats from the metric results. If more than one query is available, only first query's results will be considered.

If metrics tab doesn't result any data or have no queries/results, **Auto Generate all stats** will not work. You may need to refresh metrics.