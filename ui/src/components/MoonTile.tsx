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

  function handleKillTag(e: React.MouseEvent<HTMLDivElement>) {
      const tag = e.currentTarget! as HTMLDivElement;
      // console.log('killing tag', tag)
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

  const keyFile = function (patp:string, data:string) {
 
    patp = patp.slice(1) // remove ~
    
    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: 'text/key' });
 
    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob)
 
    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a')
 
    // Passing the blob downloading url
    a.setAttribute('href', url)
 
    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', `${patp}.key`);
 
    // Performing a download with click
    a.click()
}

  function copyToClipboard(text:string) {
    navigator.clipboard.writeText(text);
  }

  return (
      <div key={moon.who}
        className="block overflow-none max-w-full bg-gray-100 bg-opacity-80 hover:bg-opacity-100 mb-2 p-3">

      <div>
        <div className="inline">
          <div onClick={handleSelect} className="align-middle mr-3 inline-block hover:cursor-pointer unselectable">
            {isSelect
            ? <ChevronDown />
            : <ChevronUp />
            }
          </div>

          <h2 className="inline-block font-bold font-mono cursor-default mr-4">
            {moon.who}
          </h2>
        </div>

        {moon.tag.length > 0 && 
          <div className="inline-block">
            {moon.tag.map((tag:string) => (
              <div
                key={tag}
                className="text-gray-600 border-gray-400 \
                           border pl-1 pr-2 mr-1 my-0 py-0 inline-block"
              >
                {/* x / delete icon */}
                <div
                  className="inline"
                  onClick={handleKillTag}
                  id={tag}
                 >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1 inline-block hover:cursor-pointer"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth="2"
                 
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </div>

                <span className='cursor-default'>
                  {tag}
                </span>
              </div>
          ))}
          </div>
        }

        </div>
        {isSelect &&
        /* expanded moon info */
        <div className="inline-block pt-2 mt-2 w-full text-sm border-t border-gray-400 text-gray-600">
          
         
          {/* buttons */}
          <div className="inline-block mb-1">
            {/* <button className="border-2 border-gray-400 hover:bg-blue-100 font-bold mr-2 py-1 px-2 "
                    onClick={breachMoon}
              >breach</button>
            <button className="border-2 border-gray-400 hover:bg-purple-100 font-bold mr-2 py-1 px-2 "
                    onClick={rekeyMoon}
              >cycle keys</button>
            <button className="border-2 border-gray-400 hover:bg-red-100 font-bold mr-2 py-1 px-2 "
                    onClick={forgetMoon}
              >forget</button> */}
            <button className="underline font-bold mr-3 py-1 "
                    onClick={breachMoon}
              >breach</button>
            <button className="underline font-bold mr-3 py-1"
                    onClick={rekeyMoon}
              >cycle keys</button>
            {/* forget moon */}
            <button className="underline font-bold mr-3 py-1"
                    onClick={forgetMoon}
              >forget</button>
          </div>

          {/* new tag input */}
          <div className="inline-block border-gray-400 border mb-1">

              <input id={moon.who+"-tag-input"} type="text"
                onKeyPress={handleInputPress}
                placeholder="(add tag here)"
                className="bg-transparent pl-1 py-1 ml-1 \
                           disable-input-select"
                
                />


            {/* + / add tag icon */}
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block hover:cursor-pointer text-gray-500"
                viewBox="0 0 20 20" fill="currentColor"
                onClick={handleNewTag}
              >
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
          </div>


          {/* moon data */}

          <div
            className="text-sm max-w-full"
            
          >

            {/* <span className="mt-2 inline-block"
            style={{
              'maxWidth':'100%',
              'overflowX':'scroll',
              'wordWrap':'unset',
              'whiteSpace':'nowrap',
              'overflow':'-moz-hidden-unscrollable'
            }}
            >
              {`./urbit -w ${moon.who.slice(1)} -G ${moon.sed}`}
            </span> */}

            <p
              className='mt-1'
              >
              <span
                className='hover:cursor-pointer underline text-blue-500 '
                onClick={(e:any) => keyFile(moon.who, moon.sed)}
              >
                {`${moon.who.slice(1)}.key`}
              </span>
            </p>

            <p className='mt-2 cursor-default'>
            {new Date(moon.dat * 1000).toLocaleString('en-US')}
            </p>

          </div>

        </div>
        }
      </div>
  );
};
