"use client";

import API from "@/lib/api";
import { clearToken, getToken, setToken } from "@/lib/auth";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await API.get("/Auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = (token: string, userData: any) => {
    setToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await API.post("/Auth/logout", {}, { headers: { Authorization: `Bearer ${getToken()}` } });
    } catch { }
    clearToken();
    setUser(null);
    window.location.href = "/auth/login";
  };

  return { user, login, logout, loading, fetchProfile };
}
