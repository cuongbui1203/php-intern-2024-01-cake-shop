import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Edit({ auth, user }) {
    const [t] = useTranslation();
    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState(user.address);
    const [dob, setDob] = useState(user.dob);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);

    const handle = async () => {
        try {
            const data = {
                name: name,
                address: address,
                dob: dob,
                phone: phone,
                email: email,
                changeMail: email != user.email
            };
            const res = await window.axios.put(
                route('api.users.update', {
                    user: user.id
                }),
                data
            );
            if (res.data.success) {
                alert(t('Success'));
                location.pathname = location.pathname;
            }
        } catch (e) {}
    };

    return (
        <>
            <Navbar auth={auth} />
            <Title name={'Edit'} />
            <div className=" flex justify-center">
                <div className=" w-[500px] flex flex-col justify-center align-content-center">
                    <div className="my-2">
                        <Label value={'Name'} />
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Input>
                    </div>
                    <div className="my-2">
                        <Label value={'Email'} />
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Input>
                    </div>
                    <div className="my-2">
                        <Label value={'Dob'} />
                        <Input
                            value={dob}
                            type="date"
                            onChange={(e) => setDob(e.target.value)}
                        ></Input>
                    </div>
                    <div className="my-2">
                        <Label value={'Address'} />
                        <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Input>
                    </div>
                    <div className="my-2">
                        <Label value={'Phone'} />
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></Input>
                    </div>
                    <div className=" w-100 text-center my-2">
                        <Button onClick={handle}>{t('ok')}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
