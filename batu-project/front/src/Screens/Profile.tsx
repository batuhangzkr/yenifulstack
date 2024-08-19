import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { instance } from "../api";
import { useNavigate } from "react-router-dom";

export type TUserData = {
  uye_adi: string;
  uye_soyadi: string;
  uye_tel_no: string;
  uye_sehir: string;
  uye_email: string;
  uye_sifre: string;
  uye_kayit_tarihi: string;
};

export function Profile() {

  const [user, setUser] = useState<TUserData | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (!token) return navigate("/login");
    instance.post("/auth/profile", { token }).then(({ data }) => {
      setUser(data);
    });
  }, []);

  return <div>{user?.uye_adi} {user?.uye_soyadi}</div>;
}
