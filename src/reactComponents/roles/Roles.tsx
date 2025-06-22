import { Input } from "@/components/ui/input";
import { CirclePlus, Trash } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import _ from "lodash";
import { Button } from "@/components/ui/button";

type ChildItem = {
  url: string;
  des: string;
};

type AllChildType = {
  [key: string]: ChildItem;
};

function Roles() {
  const [allChild, setAllChild] = useState<AllChildType>({
    child: { url: "", des: "" },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target;
    setAllChild((prev) => {
      const updated = _.cloneDeep(prev);
      updated[key][name as keyof ChildItem] = value;
      return updated;
    });
  };

  const addNewRow = (index: number) => {
    const cloneAllChild = _.cloneDeep(allChild);
    cloneAllChild[`child${index + 1}`] = { url: "", des: "" };
    setAllChild(cloneAllChild);
  };

  const deleteRow = (key: string) => {
    if (Object.keys(allChild).length === 1) return;
    const updated = _.cloneDeep(allChild);
    delete updated[key];
    setAllChild(updated);
  };

  const handleSaveChild = () => {
    console.log(allChild);
  };
  return (
    <div>
      <h1 className="mt-2">Add one or many rows at one time</h1>
      <div className="h-[1px] bg-gray-300 mt-2"></div>
      <div className="mt-2">
        {Object.entries(allChild).map(([key, value], index) => (
          <div key={key} className="flex gap-2 items-center">
            <div className="w-full">
              <h1>URL</h1>
              <Input
                name="url"
                onChange={(e) => handleChange(e, key)}
                value={value.url}
                type="text"
                placeholder="ex: /read"
              />
            </div>
            <div className="w-full">
              <h1>Description</h1>
              <Input
                name="des"
                onChange={(e) => handleChange(e, key)}
                value={value.des}
                type="text"
                placeholder="ex: list all user"
              />
            </div>
            <div className="flex items-center mt-4">
              <CirclePlus
                className="cursor-pointer text-green-500 "
                onClick={() => {
                  addNewRow(index);
                }}
              />
              <Trash
                className="cursor-pointer text-red-500"
                onClick={() => {
                  deleteRow(key);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <Button
          onClick={() => {
            handleSaveChild();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Roles;
