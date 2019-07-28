# Headline

## Standard

```react
frame: true
responsive: true
showSource: false
---
<Headline
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
/>
```

## Cover

```react
frame: true
responsive: true
showSource: false
---
<Headline
  cover={true}
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
/>
```

## Background

```react
frame: true
responsive: true
showSource: false
---
<Headline
  background={null}
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
/>
```

## Animate

```react
frame: true
responsive: true
showSource: false
---
<Headline
  animate={true}
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
/>
```

## Align

```react
frame: true
responsive: true
showSource: false
span: 3
---
<Headline
  align="center"
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
/>
```

```react
frame: true
responsive: true
showSource: false
span: 3
---
<Headline
  align="right"
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
/>
```

## Editable

```react
frame: true
responsive: true
showSource: false
---
<Headline
  updateSelf={(payload) => console.log("updateSelf(): ", payload)}
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
/>
```

## Combination

```react
frame: true
responsive: true
showSource: false
---
<Headline
  align="center"
  animate={true}
  background={null}
  cover={true}
  subtitle="Subtitle of the highlight"
  title="Title of the highlight"
  updateSelf={(payload) => console.log("updateSelf(): ", payload)}
/>
```
