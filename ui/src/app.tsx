import React, { useEffect, useState } from 'react';
import { KeyboardEvent } from 'react';
import { MoonTile } from './components/MoonTile';
import Urbit from '@urbit/http-api';
import urbitOb from 'urbit-ob';
import _ from "lodash";

import moonsJpeg from "./assets/moons.jpeg";
import issMoon from "./assets/issmoon.jpeg";


const urb = new Urbit('', '');
urb.ship = window.ship;

export function App() {
  const [moons, setMoons] = useState([]);
  const [houstonSub, setHoustonSub] = useState(0);

  useEffect(() => {
    if (!urb || houstonSub) {
      return;
    }
    urb.subscribe({
      app: "houston",
      path: "/moons",
      event: handleHoustonSub,
      quit: subFail,
      err: subFail
    })
      .then((subscriptionId) => {
        setHoustonSub(subscriptionId);
      });
  }, [urb, houstonSub]);

  // unsub on window close or refresh
  useEffect(() => {
    window.addEventListener("beforeunload", unsubFunc);
    return () => {
      window.removeEventListener("beforeunload", unsubFunc);
    };
  }, [houstonSub]);
  //
  const unsubFunc = () => {
    urb.unsubscribe(houstonSub);
    urb.delete();
  };


  function handleHoustonSub(update: any) {
    console.log("houston update")
    setMoons(update["moons"])
  };

  function subFail() {
    console.log("fail!")
  };

  function makeMoon() {

    const patp = document.getElementById('patp-input')! as HTMLInputElement;
    if (patp.value != "") {
      makeSpecificMoon()
    }
    else {
      urb.poke({
        app: 'houston',
        mark: 'houston-action',
        json: { 'make-moon': null }
      });
    }
  };

  function sanitizeMoonInput() {
    const patp = document.getElementById('patp-input')! as HTMLInputElement;

    if (!urbitOb.isValidPatp(patp.value)) {
      alert("invalid patp");
      return false;
    } else if (urbitOb.clan(patp.value) != "moon") {
      alert("not a moon");
      return false;
    } else if (urbitOb.sein(patp.value) != "~" + window.ship) {
      alert("not your moon");
      return false;
    } else {
      return true;
    }
  }

  function makeSpecificMoon() {
    if (!sanitizeMoonInput()) return;

    const patp = document.getElementById('patp-input')! as HTMLInputElement;

    if (!window.confirm(`Are you sure you want to create ${patp.value}? If this moon already exists, its keys will be overwritten!`)) {
      return;
    }

    urb.poke({
      app: 'houston',
      mark: 'houston-action',
      json: { 'make-my-moon': patp.value }
    });
    patp.value = "";
  }

  function importMoon() {
    if (!sanitizeMoonInput()) return;

    const patp = document.getElementById('patp-input')! as HTMLInputElement;

    urb.poke({
      app: 'houston',
      mark: 'houston-action',
      json: { 'import-moon': patp.value }
    });
    patp.value = "";
  };


  return (
    <main className="flex justify-center h-screen"
    >
      <div
        className="h-full w-full absolute top-0 left-0"
        style={{
          backgroundImage: `url(${issMoon})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}>
      </div>
      <div className="bg-blue-100 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 \
                       md:my-3 lg:my-3 xl:my-3 px-4 bg-opacity-80 \
                      flex flex-col z-20"
        style={{ backdropFilter: 'blur(36px)' }}>


        <h1 className="text-3xl font-bold my-5 text-center">houston</h1>

        <div className="flex flex-row mb-2">
          <div className="flex-1">
            <input id={"patp-input"} type="text"
              className="w-full p-2 inline-block bg-white border-gray-400"
              placeholder="~sampel-sampel-palnet"
            />
          </div>
          <div
            className="flex-end"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4"
              onClick={makeMoon}
            >create</button>

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold ml-2 py-2 px-4"
              onClick={importMoon}
            >import</button>
          </div>
        </div>

        <div
          className="flex-end overflow-y-scroll"
        // style={{
        //   height:'70%'
        // }}
        >
          {moons.map(mon => (
            <MoonTile urb={urb}
              moon={mon}
              key={mon["who"]}
            />
          ))
          }
        </div>
      </div>
    </main>
  );
}
