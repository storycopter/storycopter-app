# Headline

## Standard

```react
frame: false
showSource: false
---
<ThemeProvider>
  <Headline
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
  />
</ThemeProvider>
```


## Background

```react
frame: false
showSource: false
---
<ThemeProvider>
  <Headline
    background={null}
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
  />
</ThemeProvider>
```

## Animate

```react
frame: false
showSource: false
---
<ThemeProvider>
  <Headline
    animate={true}
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
  />
</ThemeProvider>
```

## Align

```react
frame: false
showSource: false
span: 3
---
<ThemeProvider>
  <Headline
    align="center"
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
  />
</ThemeProvider>
```

```react
frame: false
showSource: false
span: 3
---
<ThemeProvider>
  <Headline
    align="right"
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
  />
</ThemeProvider>
```

## Editable

```react
frame: false
showSource: false
---
<ThemeProvider>
  <Headline
    updateSelf={(payload) => console.log("updateSelf(): ", payload)}
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
  />
</ThemeProvider>
```

## Cover

```react
frame: false
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    cover={true}
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
  />
</ThemeProvider>
```

## Combination

```react
frame: true
responsive: true
showSource: false
---
<ThemeProvider>
  <Headline
    align="center"
    animate={true}
    background={null}
    cover={true}
    subtitle="Subtitle of the highlight"
    title="Title of the highlight"
    updateSelf={(payload) => console.log("updateSelf(): ", payload)}
  />
</ThemeProvider>
```
