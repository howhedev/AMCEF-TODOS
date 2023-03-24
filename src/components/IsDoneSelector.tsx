import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { TodoFilterByEnum } from "../App";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  onSelectDone: (done: TodoFilterByEnum) => void;
}

export default function IsDoneSelector({ onSelectDone }: Props) {
  const [selected, setSelected] = useState<TodoFilterByEnum>(
    TodoFilterByEnum.all
  );

  const handleSelect = (selectedFilter: TodoFilterByEnum) => {
    setSelected(selectedFilter);
    onSelectDone(selectedFilter);
  };

  return (
    <Menu as="div" className="relative text-left w-1/4">
      <div>
        <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-md w-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selected}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-full origin-top-left rounded-md bg-white focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleSelect(TodoFilterByEnum.all)}
                  href="#"
                  className={classNames(
                    active ? "bg-cyan-200 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  All
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleSelect(TodoFilterByEnum.done)}
                  href="#"
                  className={classNames(
                    active ? "bg-cyan-200 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Done
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleSelect(TodoFilterByEnum.pending)}
                  href="#"
                  className={classNames(
                    active ? "bg-cyan-200 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Pending
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
