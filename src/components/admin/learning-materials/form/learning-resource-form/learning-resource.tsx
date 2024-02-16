import React from "react";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import CoverImageUpload from "@components/ui/custom/image/cover-image-input";
import { useState } from "react";
import { Textarea } from "@components/ui/textarea";
import { Card } from "@components/ui/card";
import { useParams } from "react-router-dom";
import useGetLearningDraftView from "../../../../../hooks/api/get/useGetLearningView";
import AddLearningResourceForm from "./add-learning-resource-form";
import useDeleteLearningResource from "../../../../../hooks/api/delete/useDeleteLearningResource";
import { toast } from "sonner";
import { Checkbox } from "../../../../ui/checkbox";
import usePutLearningFeatured from "../../../../../hooks/api/put/usePutLearningFeatured";
import DialogAddResource from "../../dialogs/dialog-add-resource/dialog-add-resource";
import DialogEditResource from "../../dialogs/dialog-edit-resource/dialog-edit-resource";

const LearningResourceForm = () => {
  const { learningsId } = useParams();
  const [hide, setHide] = useState<boolean>(false);
  const { data: LearningData } = useGetLearningDraftView(learningsId || "");
  console.log(LearningData);

  const { mutateAsync: deleteResource } = useDeleteLearningResource();
  const handleDelete = async (id: string) => {
    await deleteResource(id);
    toast.success("Resource Deleted Successfully!");
  };

  const { mutateAsync: putFeatured } = usePutLearningFeatured();
  const handleIsFeatured = async (id: string) => {
    await putFeatured({ materialId: learningsId || "", id: id });
    toast.success("Featured Successfully!");
  };
  return (
    <div>
      {/* add resource */}
      <div className="flex justify-end mb-4">
        <DialogAddResource />
      </div>

      {/* resource form */}
      {LearningData?.learning_resource &&
        LearningData.learning_resource.length <= 0 && (
          <div className="py-10 flex items-center justify-center">
            <h4 className="text-gray-500 font-poppins-medium">
              No Resource Available. Add now...
            </h4>
          </div>
        )}
      {LearningData?.learning_resource?.map((resource, index) => (
        <Card key={index} className="p-4 mb-4">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <h2 className="text-sm font-bold tracking-tight">
              Resource {index + 1}
            </h2>
            <div className="w-full flex justify-between gap-4">
              <div className="grid w-full max-w-[46rem] items-center gap-1.5">
                <Label>Title</Label>
                <Input
                  type="text"
                  value={resource.name}
                  placeholder="Input resource title"
                  disabled={true}
                />
              </div>

              <div className="grid w-full max-w-[10rem] items-center gap-1.5">
                <Label>Type</Label>
                <Input
                  type="text"
                  className=" capitalize"
                  value={resource.type}
                  placeholder="Type"
                  disabled={true}
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label>Description</Label>
              <Textarea
                placeholder="insert resource desc"
                className="active:border-green-500"
                value={resource.description || ""}
                disabled={true}
              />
            </div>
            {/* Source  */}
            {resource.type === "video" && (
              <div className="grid w-full items-center gap-1.5">
                <div>
                  <Label>Video Source</Label>
                  <Input
                    type="text"
                    value={resource.resource}
                    placeholder="Input resource link"
                    disabled={true}
                  />
                </div>
              </div>
            )}
            {resource.type === "image" && (
              <div className="grid w-full items-center gap-1.5">
                <div>
                  <Label>Image Uploaded</Label>
                  <img
                    src={resource.resource}
                    alt="Uploaded"
                    className="h-64 w-full rounded-lg object-cover object-center border"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={resource.is_featured}
                onCheckedChange={() => handleIsFeatured(resource.id)}
              />
              <label className="text-sm font-medium leading-none">
                Featured
              </label>
            </div>

            <div className="flex gap-4">
              <DialogEditResource resourceId={resource.id} />
              <Button
                variant="destructive"
                onClick={() => handleDelete(resource.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {/* <>
        {hide && (
          <>
            <hr className="my-8" />
            <AddLearningResourceForm setHide={setHide} />
          </>
        )}
      </> */}
      {/* {hide ? (
        <div className="flex justify-end">
          <Button variant={"destructive"} onClick={() => setHide(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button onClick={() => setHide(true)}>Add more source</Button>
        </div>
      )} */}
    </div>
  );
};

export default LearningResourceForm;
