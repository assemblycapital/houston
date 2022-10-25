# houston
urbit moon dashboard

houston exposes a poke api for your moon utilities:
 * |moon
 * |moon-breach
 * |moon-cycle-keys
 
houston only accepts pokes from our.bowl

jael is still the source of truth for each moons pubkey, life, and rift.
when a moon is created or rekeyed through houston, houston keeps a copy of the private key.
the private key / seed is needed when launching the moon for the first time or after a breach.

moons can be initially booted using the following command:

```./urbit -w <moon-name> -G <seed> -c <pier-name>```


## Using The Frontend
the ```create``` button spawns a new moon. this maps to |moon.
it can optionally be given a @p. if not, it will create a random moon.

each moon has a ```breach``` button and a ```cycle keys``` button. these correspond with |moon-breach and |moon-cycle-keys respectively.
moons also have a ```forget``` button. this simply removes the moon from houstons agent state. it doesnt affect the actual moon.

users can ```import``` a moon, which just adds the moon @p into houston without any metadata.
this allows existing moons to be tracked and tagged as part of the same database.
imported moons can still be breached and can still have their keys reset from the houston UI.
when an imported moon has its keys reset, the new data will be stored in houston.

moons can be given ```tags``` which are just arbitrary text. this should be useful to track:
 * what services the moon is responsible for
 * what machine the moon is running on
 * who operates the moon

## Using The Poke API
houston can be poked by other apps to create / breach / rekey moons. previously, this was only possible through dojo.
for a spec of the poke API, refer to the source code.



## Installing the Desk From Source
in dojo:
```
|merge %houston our %base
|mount %houston
```
in unix:
```
cd <mounted_houston_desk>
rm -r ./*
cp -rL <(urbit)/pkg/base-dev>/* .
cp -rL <(urbit)/pkg/garden-dev>/* .
cd <this_repo>/desk/
./install.sh -w <mounted_houston_desk>
```
in dojo:
```
|commit %houston
|install our %houston
```

## UI

houston is built primarily using [React], [Typescript], and [Tailwind CSS]. [Vite] ensures that all code and assets are loaded appropriately, bundles the application for distribution and provides a functional dev environment.

### Getting Started

To get started using houston first you need to run `npm install` inside the `ui` directory.

To develop you'll need a running ship to point to. To do so you first need to add a `.env.local` file to the `ui` directory. This file will not be committed. Adding `VITE_SHIP_URL={URL}` where **{URL}** is the URL of the ship you would like to point to, will allow you to run `npm run dev`. This will proxy all requests to the ship except for those powering the interface, allowing you to see live data.

Regardless of what you run to develop, Vite will hot-reload code changes as you work so you don't have to constantly refresh.

### Deploying

To deploy, run `npm run build` in the `ui` directory which will bundle all the code and assets into the `dist/` folder. This can then be made into a glob, and linked to from the desk.docket-0 file

[urbit.org glob docs](https://developers.urbit.org/reference/additional/dist/glob)



