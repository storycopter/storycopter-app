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
    fill="url(sample.jpg)"
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
    fill="url(sample.jpg)"
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
    fill="url(sample.jpg)"
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
    fill="url(sample.jpg)"
    mask="dark"
    subtitle="A subtitle belonging to the Headline. Such item can contain lenghty text."
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    title="A title of the Headline"
    updateSelf={(payload) => console.log("updateSelf(): ", payload)}
  />
</ThemeProvider>
```
