import React, { useState } from 'react';
import { KeyboardEvent } from 'react';
import Urbit from '@urbit/http-api';

interface moonItem {
  who: string;
  pub: string;
  sec: string;
  sed: string;
  rif: string;
  lif: string;
  dat: number;
  tag: any;
}

interface MoonTileProps {
  urb: Urbit;
  moon: moonItem;
}

export const MoonTile: React.FC<MoonTileProps> = ({urb, moon}) => {
  const [isSelect, setIsSelect] = useState(false);

  // support add-tag from pressing enter
  function handleInputPress(e : KeyboardEvent<HTMLInputElement>) {
    if (e.which == 13) {
      // enter keypress
      handleNewTag();
    }
  }
  function handleNewTag() {
    const newTag = document.getElementById(`${moon.who}-tag-input`)! as HTMLInputElement;
    if (newTag.value == "") return;
    urb.poke({
        app:  'houston',
        mark: 'houston-action',
        json: {'add-tag':
                {
                  'who':moon.who,
                  'tag':newTag.value
                }
              }
      });
    newTag.value = "";
  }

  function handleKillTag(e: React.MouseEvent<SVGSVGElement>) {
      const tag = e.target! as SVGSVGElement;
      urb.poke({
          app:  'houston',
          mark: 'houston-action',
          json: {'del-tag':
                  {
                    'who':moon.who,
                    'tag':tag.id!
                  }
                }
        });
  }

  function handleSelect() {
      setIsSelect(!isSelect)
  }

  function breachMoon() {
      if(window.confirm(`Are you sure you want to breach ${moon.who}? This action is irreversable!`)){
        urb.poke({
            app: 'houston',
            mark: 'houston-action',
            json: {'breach-moon':moon.who}
          });
      }
  };

  function rekeyMoon() {
      if(window.confirm(`Are you sure you want to rekey ${moon.who}? This action is irreversable!`)){
        urb.poke({
            app: 'houston',
            mark: 'houston-action',
            json: {'rekey-moon':moon.who}
          });
      }
      };

  function forgetMoon() {
      if(window.confirm(`Are you sure you want to forget ${moon.who}? This action is irreversable!`)){
        urb.poke({
            app: 'houston',
            mark: 'houston-action',
            json: {'forget-moon':moon.who}
          });
      }
  };



  // should these be components??
  function ChevronUp() {
    return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className="h-6 w-6"
         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
    )
  }
  function ChevronDown() {
    return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className="h-6 w-6"
         fill="none" viewBox="0 0 24 24"
         stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
    )
  }

  return (
      <div key={moon.who}
        className="block overflow-scroll max-w-full bg-gray-100 hover:bg-gray-200 rounded p-3">

        <div onClick={handleSelect} className="align-middle mr-3 inline-block hover:cursor-pointer">
          {isSelect
          ? <ChevronDown />
          : <ChevronUp />
          }
        </div>

        <h2 className="inline-block font-bold font-mono">{moon.who}</h2>
            <div className="inline-block ml-4">
              {moon.tag.map((tag:string) => (
                <div
                  key={tag}
                  className="hover:bg-white text-gray-600 border-gray-400 border-2 pl-1 pr-2 mr-1 my-0 py-0 rounded inline-block"  
                >
                  {/* x / delete icon */}
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1 inline-block hover:cursor-pointer"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    strokeWidth="2"
                    onClick={handleKillTag}
                    id={tag}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>
                    {tag}
                  </span>
                </div>
            ))}
            </div>
            <br/>
        {isSelect &&
        /* expanded moon info */
        <div className="inline-block mt-1">
          {/* buttons */}
          <div className="inline-block">
            <button className="border-2 border-gray-400 bg-white hover:bg-blue-100 font-bold mr-2 py-1 px-2 rounded"
                    onClick={breachMoon}
              >breach</button>
            <button className="border-2 border-gray-400 bg-white hover:bg-purple-100 font-bold mr-2 py-1 px-2 rounded"
                    onClick={rekeyMoon}
              >cycle keys</button>
            {/* forget moon */}
            <button className="border-2 border-gray-400 bg-white hover:bg-red-100 font-bold mr-2 py-1 px-2 rounded"
                    onClick={forgetMoon}
              >forget</button>
          </div>

          {/* new tag input */}
          <div className="inline-block rounded border-gray-400 border-2 mb-2">
            <input id={moon.who+"-tag-input"} type="text"
              onKeyPress={handleInputPress}
              placeholder="(add tag here)"
              className="bg-transparent pl-1 py-1 ml-1 rounded"/>

            {/* + / add tag icon */}
            <svg xmlns="http://www.w3.org/2000/svg"
              className="rounded hover:bg-blue-400 h-5 w-5 inline-block hover:cursor-pointer"
              viewBox="0 0 20 20" fill="currentColor"
              onClick={handleNewTag}
            >
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>

          {/* moon data */}
          <table>
            <tbody>
            <tr>
              <td><strong>public:</strong></td>
              <td>{moon.pub}</td>
            </tr>
            <tr>
              <td><strong>private:</strong></td>
              <td>{moon.sec}</td>
            </tr>
            <tr>
              <td><strong>seed:</strong></td>
              <td>{moon.sed}</td>
            </tr>
            <tr>
              <td><strong>spawned:</strong></td>
              <td>
                {
                 new Date(moon.dat * 1000).toLocaleString('en-US')
                }
              </td>
            </tr>
            </tbody>
          </table>


        </div>
        }
      </div>
  );
};
