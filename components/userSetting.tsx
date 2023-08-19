'use client';

import { User } from '@/models/user';
import { View } from './view';
import {
  Card,
  CardBody,
  avatar,
  CardFooter,
  Image,
  Button,
  Input,
} from '@nextui-org/react';
import router from 'next/router';
import { useState } from 'react';

export default function UserSetting(props: { user: User }) {
  const user = props.user;
  const [avatar, setAvatar] = useState(user.avatar);

  return (
    <View>
      <Card className="w-full h-full">
        <CardBody className="flex flex-col items-center justify-center">
          <label htmlFor="avatar" className="mx-auto">
            <Image
              alt="avatar"
              radius="sm"
              src={avatar}
              width={100}
              height={100}
            />
          </label>
          <Input
            id="avatar"
            size="sm"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              (async function () {
                if (!e.target.files || e.target.files.length == 0) {
                  return;
                }
                const selectedFile = e.target.files[0];
                if (!selectedFile.type.startsWith('image/')) {
                  return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                  if (!e.target) {
                    return;
                  }
                  const val = e.target.result as string;
                  setAvatar(val);
                  user.avatar = val;
                };
                reader.readAsDataURL(selectedFile);
              })();
            }}
          ></Input>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2">
          <Button
            color="success"
            variant="flat"
            onClick={async () => {
              await fetch(`/api/user`, {
                method: 'PUT',
                body: JSON.stringify(user),
              });
              router.back();
            }}
          >
            SAVE
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
