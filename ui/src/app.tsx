import React, { useEffect, useState } from 'react';
import { KeyboardEvent } from 'react';
import { MoonTile } from './components/MoonTile';
import Urbit from '@urbit/http-api';
import urbitOb from 'urbit-ob';
import _ from "lodash";

import moonsJpeg from "./assets/moons.jpeg";


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


  function handleHoustonSub(update:any) {
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
        json: {'make-moon':null}
      });
    }
    };

  function handleInputPress(e : KeyboardEvent<HTMLInputElement>) {
    if (e.which == 13) {
      // enter keypress
      makeSpecificMoon();
    }
  }
  function makeSpecificMoon() {
    const patp = document.getElementById('patp-input')! as HTMLInputElement;

    if (!urbitOb.isValidPatp(patp.value)) {
      alert("invalid patp");
    } else if (urbitOb.clan(patp.value) != "moon") {
      alert("not a moon");
    } else if (urbitOb.sein(patp.value) != "~"+window.ship) {
      console.log(urbitOb.sein(patp.value));
      console.log(window.ship);
      alert("not your moon");
    } else {
    urb.poke({
        app: 'houston',
        mark: 'houston-action',
        json: {'make-my-moon':patp.value}
      });
    patp.value = "";
    }
  };

  return (
    <main className="flex justify-center h-screen"
           style={{
                  backgroundImage: `url(${moonsJpeg})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                 }}>
      <div className="bg-blue-100 space-y-6 py-20 lg:w-1/2 rounded my-3 px-4 bg-opacity-70 overflow-y-scroll"
           style={{backdropFilter: 'blur(36px)'}}>
        <h1 className="text-3xl font-bold">houston moon manager</h1>
          <input id={"patp-input"} type="text"
            className="px-4 py-2 inline-block bg-white rounded border-gray-400 border-2 w-3/5 mb-2"
            onKeyPress={handleInputPress}
            placeholder="~sampel-monmep-sampel-palnet"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded"
                  onClick={makeMoon}
            >|moon</button>
          {moons.map(mon => (
              <MoonTile urb={urb}
                        moon={mon}
                        key={mon["who"]}
              />
            ))
          }
      </div>
    </main>
  );
}
