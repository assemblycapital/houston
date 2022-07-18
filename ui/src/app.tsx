import React, { useEffect, useState } from 'react';
import { MoonTile } from './components/MoonTile';
import Urbit from '@urbit/http-api';
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
        urb.poke({
            app: 'houston',
            mark: 'houston-action',
            json: {'make-moon':null}
          });
      };

  return (
    <main className="flex justify-center h-screen"
           style={{
                  backgroundImage: `url(${moonsJpeg})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                 }}>
      <div className="bg-blue-100 space-y-6 py-20 w-1/2 rounded my-3 px-4 bg-opacity-70"
           style={{backdropFilter: 'blur(12px)'}}>
        <h1 className="text-3xl font-bold">houston moon manager</h1>
        <p> WARNING: your moons CAN pwn you. for protection, change team:title in zuse to not include moons :)</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={makeMoon}
          >spawn a new moon</button>
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
