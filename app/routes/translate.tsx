/* eslint-disable react-hooks/rules-of-hooks */
import { ActionFunction, ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { translateApi } from "~/services/huggingFace/translate.service";

const languages = [
  {
    value: "en-es",
    option: "English to Spanish",
  },
  {
    value: "en-de",
    option: "English to German",
  },
  {
    value: "en-fr",
    option: "English to French",
  },
];

export default function translate() {
  const actionData = useActionData();
  console.log(actionData, "data");
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-4 text-center">
      <h1>Translate</h1>
      <form
        method="post"
        className="flex flex-col w-full min-h-11 space-y-8 max-w-sm items-center space-x-2"
      >
        <Input type="text" name="text" placeholder="Text" />
        <Select name="language">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Language</SelectLabel>
              {languages.map(({ value, option }) => (
                <SelectItem key={value} value={value}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const text = formData.get("text");
  const language = formData.get("language");
  console.log(language, "lang");
  const data = await translateApi(String(text), String(language));
  return json({ data });
  // return json({ text, language });
};
