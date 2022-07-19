# houston
urbit moon dashboard

houston exposes a poke api for your moon utilities:
 * |moon
 * |moon-breach
 * |moon-cycle-keys
 
houston only accepts pokes from our.bowl

jael is still the source of truth for each moons pubkey, life, and rift.
when a moon is created or rekeyed through houston, houston keeps a copy of the private key.
the private key / seed is needed for launching the moon for the first time or after a breach.

moons can be initially booted using the following command:
```$ ./urbit -w <moon-name> -G <seed> -c <pier-name>```


## Using The Frontend
the ```create``` button spawns a new moon. this maps to |moon.
it can optionally be given a @p. if not, it will create a random moon.

each moon has a ```breach``` and a ```cycle keys``` button. these correspond with |moon-breach and |moon-cycle-keys respectively.
moons also have a ```forget``` button. this simply removes the moon from houstons agent state. it doesnt effect the actual moon.

users can ```import``` a moon, which just adds the moon @p into houston without any metadata.
this allows existing moons to be tracked and tagged as part of the same database.
imported moons can still be breached and can still have their keys reset from the houston UI.
when an imported moon has its keys reset, the new data will be stored in houston.

moons can be given ```tags``` which are just arbitrary text. this should be useful to track:
 * what services the moon is responsible for
 * what machine the moon is running on
 * who the moon belongs to


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
cp -r <(this_repo)/desk/* .
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

To deploy, run `npm run build` in the `ui` directory which will bundle all the code and assets into the `dist/` folder. This can then be made into a glob by doing the following:

1. Create or launch an urbit using the -F flag
2. On that urbit, if you don't already have a desk to run from, run `|merge %work our %base` to create a new desk and mount it with `|mount %work`.
3. Now the `%work` desk is accessible through the host OS's filesystem as a directory of that urbit's pier ie `~/zod/work`.
4. From the `ui` directory you can run `rsync -avL --delete dist/ ~/zod/work/houston` where `~/zod` is your fake urbit's pier.
5. Once completed you can then run `|commit %work` on your urbit and you should see your files logged back out from the dojo.
6. Now run `=dir /=garden` to switch to the garden desk directory
7. You can now run `-make-glob %work /houston` which will take the folder where you just added files and create a glob which can be thought of as a sort of bundle. It will be output to `~/zod/.urb/put`.
8. If you navigate to `~/zod/.urb/put` you should see a file that looks like this `glob-0v5.fdf99.nph65.qecq3.ncpjn.q13mb.glob`. The characters between `glob-` and `.glob` are a hash of the glob's contents.
9. Now that we have the glob it can be uploaded to any publicly available HTTP endpoint that can serve files. This allows the glob to distributed over HTTP.
10. Once you've uploaded the glob, you should then update the corresponding entry in the docket file at `desk/desk.docket-0`. Both the full URL and the hash should be updated to match the glob we just created, on the line that looks like this:

```hoon
    glob-http+['https://bootstrap.urbit.org/glob-0v5.fdf99.nph65.qecq3.ncpjn.q13mb.glob' 0v5.fdf99.nph65.qecq3.ncpjn.q13mb]
```

11. This can now be safely committed and deployed.

[react]: https://reactjs.org/
[typescript]: https://www.typescriptlang.org/
[tailwind css]: https://tailwindcss.com/
[vite]: https://vitejs.dev/

this repo created using urbit/create-landscape-app

