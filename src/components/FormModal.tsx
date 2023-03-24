import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Todo } from "./../services/todoService";

const schema = z.object({
  title: z
    .string()
    .min(2, { message: "You need at least 2 characters for the title" }),
  text: z
    .string()
    .max(300, { message: "Please try to describe with less than 100 chars" }),
  date: z.coerce
    .date()
    .min(new Date(), { message: "Deadline must be in the future" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  handleAdd: (data: Todo) => void;
}

export default function FormModal({ handleAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FieldValues) => {
    const toAdd: any = {
      ...data,
      date: data.date.toDateString(),
      id: uuidv4(),
      done: false,
    };

    handleAdd(toAdd);
    setIsOpen(false);
  };

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyan-500 text-white font-bold rounded-xl p-2 px-4  hover:bg-teal-500 focus:outline-none"
        >
          Add new Todo
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(!isOpen)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    New Todo
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      *Add title, description and deadline
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <div className="mt-10">
                      <label
                        htmlFor="title"
                        className="mt-2 text-sm opacity-60"
                      >
                        Title*
                      </label>
                      <input
                        {...register("title")}
                        id="title"
                        type="text"
                        className="flex w-full justify-between rounded-lg bg-cyan-50 px-4 py-2 text-left text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75 "
                      />
                      {errors.title && (
                        <p className="text-red-600">{errors.title.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="text" className="mt-2 text-sm opacity-60">
                        Description*
                      </label>
                      <textarea
                        {...register("text")}
                        id="text"
                        className="flex w-full justify-between rounded-lg bg-cyan-50 px-4 py-2 text-left text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75"
                      ></textarea>
                      {errors.text && (
                        <p className="text-red-600"> {errors.text.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="date" className="mt-2 text-sm opacity-60">
                        Deadline*
                      </label>
                      <input
                        {...register("date")}
                        id="date"
                        type="date"
                        className="flex w-full justify-between rounded-lg bg-cyan-50 px-4 py-2 text-left text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75 "
                      />
                      {errors.date && (
                        <p className="text-red-600">{errors.date.message}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-sky-400 font-bold px-4 py-2 text-sm  text-white hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-800 focus-visible:ring-offset-2"
                      >
                        Add to the list
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
