
# Project Sudoku

Aquest projecte preten crear un joc de sudoku partint d'una API que genera els trencaclosques 
i els resol de manera automàtica. Per donar personalitat a l'aplicació i un toc original
els nombres es substitueixen per símbols. 


## Acknowledgements

 - [API utilitzada: Sudoku Board](https://rapidapi.com/andrewarochukwu/api/sudoku-board/)
 
## Referències API 

#### Nou trencaclosques

```http
  GET /api/new-board
```

| Paràmetre | Tipus     | Descripció                |
| :-------- | :------- | :------------------------- |
| `RapidAPI App` | `string` | **Required**. La ID de la API a RapidAPI|
| `Request URL` | `string` | **Required**. rapidapi.com |
| `X-RapidAPI-Host` | `string` | **Required**. Header proporcionat per RapidAPI |
| `X-RapidAPI-Key` | `enum` | **Required**. Key segons l'usuari |
| `diff` | `string` | **Optional**. Dificultat del trencaclosques (per defecte 2) |

#### Resoldre trencaclosques

```http
  GET /api/solve-board
```

| Paràmetre | Tipus     | Descripció                |
| :-------- | :------- | :------------------------- |
| `RapidAPI App` | `string` | **Required**. La ID de la API a RapidAPI|
| `Request URL` | `string` | **Required**. rapidapi.com |
| `X-RapidAPI-Host` | `string` | **Required**. Header proporcionat per RapidAPI |
| `X-RapidAPI-Key` | `enum` | **Required**. Key segons l'usuari |
| `sudo` | `string` | **Required**. Trencaclosques a resoldre |


## Idea descartada

La idea inicial era crear una pàgina tipus buscador utilitzant una de les 
API del llistat proporcionat: [API personatges disney](https://disneyapi.dev/docs).
En el buscador es podrien trobar personatges i donar "like" o posar comentaris. 

Al analitzar la API durant l'aprovació de la idea vam veure que només tenia 
dos endpoints: 

![Screenshot](https://cifovirtual.cat/pluginfile.php/153645/mod_dialogue/message/149/image.png)

Això no permetia fer recerques directament a la API i soposava un problema ja que l'únic
que permetia era obtenir la informació complerta amb el primer GET. La funcionalitat
desitjada pel projecte de fer diverses crides a la API quedava massa reduïda i, per tant,
descartada.

## Primera API sudoku

Un cop descartada la primera idea, fent recerca per rapidAPI va sorgir la idea de crear un 
joc de sudoku amb la peculiaritat de que els nombres fossin substituïts per símbols.

La primera API trobada va ser [Solve-sudoku](https://rapidapi.com/sosier/api/solve-sudoku/).

Aquesta API permetia descarregar el trencaclosques i la solució alhora però tenia una
limitació de 50 cerques diàries i, per aconseguir la "key", calia fer un registre de 
la targeta de crèdit ja que, un cop superades les 50 cerques, es carregava un import.

Aquesta opció doncs, va quedar també descartada degut a que el nivell de peticions
durant el desenvolupament podia superar les 50 cerques al dia i suposaria un cost. 