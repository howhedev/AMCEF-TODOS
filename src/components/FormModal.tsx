import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ErrorCodes } from "vue";
import { z } from "zod";
import { Todo } from "./../services/todoService";

const schema = z.object({
  title: z
    .string()
    .min(2, { message: "You need at least 2 characters for the title" }),
  text: z
    .string()
    .max(100, { message: "Please try to describe with less than 100 chars" }),
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
  // const [todoToAdd, setTodoToAdd] = useState<Todo>({
  //   title: "Modal todo",
  //   done: false,
  //   text: "Upraceme to tu",
  //   date: 17176,
  //   id: uuidv4(),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FieldValues) => {
    const toAdd = { ...data, id: uuidv4(), done: false };
    setIsOpen(false);
    handleAdd(toAdd);
    console.log(toAdd);
  };
  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("submitted");
  // };

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 text-white rounded-xl p-2 px-4  hover:bg-indigo-400 focus:outline-none"
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
                    <p className="text-sm text-gray-500">Fill all the fields</p>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                  >
                    <label htmlFor="title" className="mt-2">
                      Title
                    </label>
                    <input
                      {...register("title")}
                      id="title"
                      type="text"
                      className="bg-gray-200"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                    <label htmlFor="text" className="mt-2">
                      Description
                    </label>
                    <textarea {...register("text")} id="text"></textarea>
                    {errors.title && <p>{errors.title.message}</p>}
                    <label htmlFor="date" className="mt-2">
                      Deadline
                    </label>
                    <input
                      {...register("date")}
                      id="date"
                      type="date"
                      className="form-input"
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                    <div className="mt-4">
                      <button
                        disabled={!isValid}
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Add to the list
                      </button>
                    </div>
                  </form>

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                        handleAdd(todoToAdd);
                      }}
                    >
                      Add to the list
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
