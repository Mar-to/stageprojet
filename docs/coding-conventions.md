Coding Conventions
==================

Naming Convention
-----------------

PHP
- Folder: UperCamelCase
- Classes: UpperCamelCase

HTML (Twig templates), JavaScript/TypeScript and CSS
- Folder: dashed-case
- Filenames: dashed-case

JavaScript
- Classes: UpperCamelCase
- functionName: lowerCamelCase
- variables: lowerCamelCase

HTML/CSS
- Classes-and-ids: dashed-case

PHP
---

To fix code style in PHP, run:

```shell
make cs-fix
```

JavaScript
----------

### Curly Bracket

Line return after functionName and parameters:

```
myFunction(myParameter)
{
   // stuffs
}
```

Or inline function declaration `function() { return foo; }`

### Code Indentation

Always use 3 spaces for indentation of code blocks.

### Spaces Around Operators

Always put spaces around operators ( = + - * / ), and after commas:

```
const x = y + z;
const values = ["Volvo", "Saab", "Fiat"];
```
