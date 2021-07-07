TODO 

- [ ] Four expression types

  > instant vector, range vector, scalar (number), string

- [ ] **String literal**

  > ```
  > "Double quote with escapre chars \t \\  \n"
  > `BackTick does not support escapre chars \t \\  \n`
  > ```

- [ ] **Float Literals**

  > Examples
  > ```
  > 23
  > -2.43
  > 3.4e-9
  > 0x8f
  > -Inf
  > NaN
  > ```
  
- [ ] > - 

- [ ] **Empy label values in vector selector**: will select all values where the label is missing

- [ ] 

- [ ] **Metrics vs Labels**

  > 



### **Time series Selectors**

For election of a set of time series and a single sample value for each at a given timestamp (instant):

Can be filtered by comma separated list of label matchers in curly braces (`{}`).

```
http_requests_total{job="prometheus",group="canary"}
```



 **Supports regex**

 - `=`: Select labels that are exactly equal to the provided string.
 - `!=`: Select labels that are not equal to the provided string.
 - `=~`: Select labels that regex-match the provided string.
 - `!~`: Select labels that do not regex-match the provided string.

 For example, this selects all `http_requests_total` time series for `staging`, `testing`, and `development` environments and HTTP methods other than `GET`

 ```
 http_requests_total{environment=~"staging|testing|development",method!="GET"}
 ```

**Empy label values in vector selector**: will select all values where the label is missing





 **Vectro selector** (selecting label values)

 - Must h





### Quiz

- What will be result of giving an empty label value `http_requests_total{environment=~""}`

  > Will select all values where the label is missing

- Why is the vector selector bad : `{job=~".*"}`

  > This will select the values where job is missing. Correct way should be `{job=~".+"}`

- 
