import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllGroup } from "@/services/group";
import {
  assignRoleToGroup,
  getAllRoles,
  getRolesByGroup,
} from "@/services/roles";
import type { Group } from "@/types/group";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function GroupRoles() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [roles, setRoles] = useState<
    { id: number; url: string; description: string }[]
  >([]);
  const [selectRoles, setSelectRoles] = useState<
    { id: number; url: string; isCheck: boolean }[]
  >([]);

  useEffect(() => {
    getGroups();
    handleAllRoles();
  }, []);

  const getGroups = async () => {
    try {
      const data = await getAllGroup();
      if (data && data.data.EC === "0") {
        setGroups(data.data.DT);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,...");
    }
  };

  const handleAllRoles = async () => {
    try {
      const data = await getAllRoles();
      setRoles(data.data.DT);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,...");
    }
  };

  const checkExistRoles = (
    groupRole: { Roles: { url: string } }[],
    allRoles: { id: number; url: string; description: string }[]
  ) => {
    const filterCheckRoles: { id: number; url: string; isCheck: boolean }[] =
      [];

    const groupRoleURL = groupRole.map((role: { Roles: { url: string } }) => {
      return role.Roles.url;
    });

    allRoles.map((role) => {
      const eachRow: { id: number; url: string; isCheck: boolean } = {
        id: 0,
        url: "",
        isCheck: false,
      };
      eachRow.id = role.id;
      eachRow.url = role.url;
      eachRow.isCheck = groupRoleURL.some(
        (groupRole) => groupRole === role.url
      );
      filterCheckRoles.push(eachRow);
    });

    setSelectRoles(filterCheckRoles);
  };

  const onChangeGroup = async (value: string) => {
    if (value) {
      setSelectGroup(value);
      await handleRolesByGroupID(value);
    }
  };

  const handleRolesByGroupID = async (groupID: string) => {
    try {
      const data = await getRolesByGroup(groupID);
      if (data && data.data.EC === 0) {
        checkExistRoles(data.data.DT, roles);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,...");
    }
  };

  const handleChangeRoles = (roleId: number) => {
    const cloneSelectRoles = cloneDeep(selectRoles);

    if (cloneSelectRoles[roleId].isCheck) {
      cloneSelectRoles[roleId].isCheck = false;
    } else {
      cloneSelectRoles[roleId].isCheck = true;
    }

    setSelectRoles(cloneSelectRoles);
  };

  const filterRoleForEachGroup = () => {
    const assignGroupIdAndRoleID = selectRoles.map((role) => {
      const obj: { groupID: number; roleID: number } = {
        groupID: 0,
        roleID: 0,
      };
      if (role.isCheck === true) {
        obj.groupID = Number(selectGroup);
        obj.roleID = role.id;
        return obj;
      } else {
        return "none";
      }
    });

    const filterResult = assignGroupIdAndRoleID.filter(
      (item) => item !== "none"
    );

    return filterResult;
  };

  const updateRoleToGroup = async () => {
    try {
      const data = filterRoleForEachGroup();
      const results = await assignRoleToGroup(data);
      if (results) {
        toast.success(results.data.EM);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1 className="text-2xl">Group Roles: </h1>
          <p>Select group to display all of their roles</p>
        </div>
        <div className="mt-3">
          <Select
            onValueChange={(value) => {
              onChangeGroup(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Group</SelectLabel>
                {groups &&
                  groups.map((group) => (
                    <SelectItem
                      key={`group-${group.id}`}
                      value={String(group.id)}
                    >
                      {group.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="h-[0.5px] bg-gray-300 mt-2"></div>
      </div>
      <div className="mt-2">
        {selectRoles && selectRoles.length > 0 && <h1>Assign Roles:</h1>}
        <div className="mt-2">
          {selectRoles &&
            selectRoles.length > 0 &&
            selectRoles.map((role, index) => (
              <div
                className="flex items-center gap-3 my-2 text-gray-700 font-light"
                key={`role-${index}`}
              >
                <Checkbox
                  onClick={() => {
                    handleChangeRoles(index);
                  }}
                  checked={role.isCheck}
                  id="role"
                  value={role.id}
                />
                <Label htmlFor="">{role.url}</Label>
              </div>
            ))}
        </div>
      </div>
      {selectRoles && selectRoles.length > 0 ? (
        <div className="mt-2">
          <Button
            onClick={() => {
              updateRoleToGroup();
            }}
            className="bg-amber-500"
          >
            Save Change
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default GroupRoles;
