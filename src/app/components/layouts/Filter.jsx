import React from "react";
import { Menu } from "@headlessui/react";
import GenresDropdown from "/src/app/components/layouts/GenresDropdown.jsx";
import filterIcon from "../../assets/img/filter.svg";
import searchIconNoBg from "../../assets/img/search-nobg.png";
import star from "../../assets/img/star.svg";

function Filter() {
  return (
    <div className="fixed w-full z-10">
      <div className="flex justify-around text-black bg-white items-center">
        <div className="flex justify-center space-x-1">
          <div className="self-center">Filtre</div>

          <div className="">
            <img src={filterIcon} alt="Filter icon" width="30" />
          </div>
        </div>

        {/* FILMS SERIES */}
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="self-center w-full">
              Films/Séries
            </Menu.Button>
            <Menu.Items className="absolute bg-white rounded-b w-[200px] left-[-60px] ">
              <Menu.Item>
                {({ active }) => (
                  <div className="text-center py-2">
                    <a href="#">Films</a>
                  </div>
                )}
              </Menu.Item>

              <hr />

              <Menu.Item>
                {({ active }) => (
                  <div className="text-center py-2">
                    <a href="#">Séries</a>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        {/* GENRE */}
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="self-center w-full">Genre</Menu.Button>
            <Menu.Items className="absolute bg-white rounded-b w-[200px] left-[-60px]  py-2">
              <Menu.Item>{({ active }) => <GenresDropdown />}</Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        {/* PAR ANNÉE */}
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="self-center w-full">Par année</Menu.Button>
            <Menu.Items className="absolute bg-white rounded-b w-[170px] left-[-60px]  py-2">
              <Menu.Item className="flex rounded-b w-[150px] mx-auto bg-gray-400">
                {({ active }) => (
                  <div className="flex justify-between">
                    <div className="py-1 pl-1 rounded-l text-gray-200 italic">
                      2000, 2010..
                    </div>

                    <div>
                      <img
                        src={searchIconNoBg}
                        alt="Loupe de recherche"
                        width="30"
                      />
                    </div>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        {/* PAR NOTE */}
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="self-center">Par note</Menu.Button>
            <Menu.Items className="absolute bg-white rounded-b w-[180px] left-[-60px]  py-2">
              <Menu.Item className="py-1 px-2 rounded-b">
                {({ active }) => (
                  <div className="flex justify-center space-x-1">
                    <div>
                      <div className="absolute top-[-3px] left-[1px]">
                        <img src={star} alt="" width="50" />
                      </div>

                      <div>1</div>
                    </div>

                    <div className="self-center bg-black w-[110px] h-[3px] rounded mx-auto"></div>

                    <div>5</div>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        {/* PAR PERSONNALITÉ */}
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="self-center">Par personnalité</Menu.Button>
            <Menu.Items className="absolute bg-white rounded-b w-[200px] left-[-40px]  py-2 px-5">
              <Menu.Item className="space-x-2">
                {({ active }) => (
                  <div className="">
                    <input type="checkbox" id="realisateur" />
                    <label htmlFor="realisateur">Réalisateur</label>
                  </div>
                )}
              </Menu.Item>

              <Menu.Item className="space-x-2">
                {({ active }) => (
                  <div className="">
                    <input type="checkbox" id="realisateur" />
                    <label htmlFor="realisateur">Acteur</label>
                  </div>
                )}
              </Menu.Item>

              <Menu.Item className="space-x-2">
                {({ active }) => (
                  <div className="">
                    <input type="checkbox" id="realisateur" />
                    <label htmlFor="realisateur">Scénariste</label>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        {/* STATS */}
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="self-center">Statistiques</Menu.Button>
            <Menu.Items className="absolute bg-white rounded-b w-[200px] left-[-60px]  py-2 px-5 text-center">
              <Menu.Item>
                {({ active }) => (
                  <div className="space-y-2">
                    <div>
                      <a href="#" class="">
                        Les plus vus
                      </a>
                    </div>

                    <hr />

                    <div>
                      <a href="#" class="">
                        Top 50
                      </a>
                    </div>

                    <hr />

                    <div>
                      <a href="#" class="">
                        Flop 50
                      </a>
                    </div>

                    <hr className="" />

                    <div>
                      <a href="#" class="">
                        Personnalités les mieux notés
                      </a>
                    </div>

                    <hr className="" />

                    <div>
                      <a href="#" class="">
                        Personnalités les plus vues
                      </a>
                    </div>

                    <hr className="" />

                    <div>
                      <a href="#" class="">
                        Pays les plus vus
                      </a>
                    </div>

                    <hr className="" />

                    <div>
                      <a href="#" class="">
                        Pays les mieux notés
                      </a>
                    </div>

                    <hr className="" />

                    <div>
                      <a href="#" class="">
                        Années les plus vues/notés
                      </a>
                    </div>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Filter;
