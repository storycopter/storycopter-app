# Headline

## Standard

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
  />
</ThemeProvider>
```

## Fill

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider invert>
  <Headline
    image={{
      name: "sample.jpg",
      fixed: {
        base64: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIBBAUG/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAAHchBWFDm2zhnfKIf/EABoQAAIDAQEAAAAAAAAAAAAAAAABAgQREAP/2gAIAQEAAQUC7pporEkl7yQ7DZvf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPwEf/8QAFRABAQAAAAAAAAAAAAAAAAAAIDH/2gAIAQEABj8CdP8A/8QAGhAAAwADAQAAAAAAAAAAAAAAAAERIDFxgf/aAAgBAQABPyHISlrEztejK1mw3GdP/9oADAMBAAIAAwAAABBrJoL/xAAXEQADAQAAAAAAAAAAAAAAAAAAEBEh/9oACAEDAQE/EKU1f//EABYRAAMAAAAAAAAAAAAAAAAAAAAQIf/aAAgBAgEBPxBw/8QAHRABAAICAgMAAAAAAAAAAAAAAQARIVEQMUFhcf/aAAgBAQABPxDEa4puV2SuyXu7mlyxAT17EwhfGCEUairWGdhbNeCf/9k=",
        height: 900,
        src: "sample.jpg",
        srcSet: "sample.jpg 1x,sample.jpg 1.5x,sample.jpg 2x",
        width: 1400
      },
    }}
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
  />
</ThemeProvider>
```

## Animate

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    animate={true}
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
  />
</ThemeProvider>
```

## Align

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    align="center"
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
  />
</ThemeProvider>
```

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    align="right"
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
  />
</ThemeProvider>
```

## Mask

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider >
  <Headline
    image={{
      name: "sample.jpg",
      fixed: {
        base64: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIBBAUG/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAAHchBWFDm2zhnfKIf/EABoQAAIDAQEAAAAAAAAAAAAAAAABAgQREAP/2gAIAQEAAQUC7pporEkl7yQ7DZvf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPwEf/8QAFRABAQAAAAAAAAAAAAAAAAAAIDH/2gAIAQEABj8CdP8A/8QAGhAAAwADAQAAAAAAAAAAAAAAAAERIDFxgf/aAAgBAQABPyHISlrEztejK1mw3GdP/9oADAMBAAIAAwAAABBrJoL/xAAXEQADAQAAAAAAAAAAAAAAAAAAEBEh/9oACAEDAQE/EKU1f//EABYRAAMAAAAAAAAAAAAAAAAAAAAQIf/aAAgBAgEBPxBw/8QAHRABAAICAgMAAAAAAAAAAAAAAQARIVEQMUFhcf/aAAgBAQABPxDEa4puV2SuyXu7mlyxAT17EwhfGCEUairWGdhbNeCf/9k=",
        height: 900,
        src: "sample.jpg",
        srcSet: "sample.jpg 1x,sample.jpg 1.5x,sample.jpg 2x",
        width: 1400
      },
    }}
    mask="bright"
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    title="A title of the Headline"
  />
</ThemeProvider>
```

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider invert>
  <Headline
    image={{
      name: "sample.jpg",
      fixed: {
        base64: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIBBAUG/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAAHchBWFDm2zhnfKIf/EABoQAAIDAQEAAAAAAAAAAAAAAAABAgQREAP/2gAIAQEAAQUC7pporEkl7yQ7DZvf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPwEf/8QAFRABAQAAAAAAAAAAAAAAAAAAIDH/2gAIAQEABj8CdP8A/8QAGhAAAwADAQAAAAAAAAAAAAAAAAERIDFxgf/aAAgBAQABPyHISlrEztejK1mw3GdP/9oADAMBAAIAAwAAABBrJoL/xAAXEQADAQAAAAAAAAAAAAAAAAAAEBEh/9oACAEDAQE/EKU1f//EABYRAAMAAAAAAAAAAAAAAAAAAAAQIf/aAAgBAgEBPxBw/8QAHRABAAICAgMAAAAAAAAAAAAAAQARIVEQMUFhcf/aAAgBAQABPxDEa4puV2SuyXu7mlyxAT17EwhfGCEUairWGdhbNeCf/9k=",
        height: 900,
        src: "sample.jpg",
        srcSet: "sample.jpg 1x,sample.jpg 1.5x,sample.jpg 2x",
        width: 1400
      },
    }}
    mask="dark"
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    title="A title of the Headline"
  />
</ThemeProvider>
```

## Editable

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    updateSelf={(payload) => console.log("updateSelf(): ", payload)}
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
  />
</ThemeProvider>
```

## Cover

```react
frame: true
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    cover={true}
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
  />
</ThemeProvider>
```

## Combination

```react
frame: true
responsive: true
showSource: false
---
<ThemeProvider invert>
  <Headline
    align="center"
    animate={true}
    cover={true}
    image={{
      name: "sample.jpg",
      fixed: {
        base64: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIBBAUG/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAAHchBWFDm2zhnfKIf/EABoQAAIDAQEAAAAAAAAAAAAAAAABAgQREAP/2gAIAQEAAQUC7pporEkl7yQ7DZvf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPwEf/8QAFRABAQAAAAAAAAAAAAAAAAAAIDH/2gAIAQEABj8CdP8A/8QAGhAAAwADAQAAAAAAAAAAAAAAAAERIDFxgf/aAAgBAQABPyHISlrEztejK1mw3GdP/9oADAMBAAIAAwAAABBrJoL/xAAXEQADAQAAAAAAAAAAAAAAAAAAEBEh/9oACAEDAQE/EKU1f//EABYRAAMAAAAAAAAAAAAAAAAAAAAQIf/aAAgBAgEBPxBw/8QAHRABAAICAgMAAAAAAAAAAAAAAQARIVEQMUFhcf/aAAgBAQABPxDEa4puV2SuyXu7mlyxAT17EwhfGCEUairWGdhbNeCf/9k=",
        height: 900,
        src: "sample.jpg",
        srcSet: "sample.jpg 1x,sample.jpg 1.5x,sample.jpg 2x",
        width: 1400
      },
    }}
    mask="dark"
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
    updateSelf={(payload) => console.log("updateSelf(): ", payload)}
  />
</ThemeProvider>
```
