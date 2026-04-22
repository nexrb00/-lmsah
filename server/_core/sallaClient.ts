import { ENV } from "./env";

export interface SallaAuthResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export interface SallaStore {
  id: number;
  name: string;
  email: string;
  phone?: string;
  logo?: string;
  description?: string;
}

export interface SallaProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
  url?: string;
}

export interface SallaOrder {
  id: number;
  customer_name: string;
  customer_email?: string;
  total: number;
  status: string;
  items_count: number;
  created_at?: string;
}

class SallaClient {
  private clientId: string;
  private clientSecret: string;
  private baseUrl = "https://api.salla.sa";

  constructor() {
    this.clientId = ENV.sallaClientId || "";
    this.clientSecret = ENV.sallaClientSecret || "";

    if (!this.clientId || !this.clientSecret) {
      console.warn("[SallaClient] Missing Salla credentials");
    }
  }

  /**
   * الحصول على رمز الوصول من سلة
   */
  async getAccessToken(authorizationCode: string): Promise<SallaAuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: authorizationCode,
          redirect_uri: `${process.env.VITE_FRONTEND_URL || "http://localhost:3000"}/auth/salla/callback`,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Salla API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("[SallaClient] Failed to get access token:", error);
      throw error;
    }
  }

  /**
   * تحديث رمز الوصول
   */
  async refreshAccessToken(refreshToken: string): Promise<SallaAuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Salla API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("[SallaClient] Failed to refresh token:", error);
      throw error;
    }
  }

  /**
   * جلب بيانات المتجر
   */
  async getStore(accessToken: string): Promise<SallaStore> {
    try {
      const response = await fetch(`${this.baseUrl}/v2/stores/info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Salla API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("[SallaClient] Failed to get store info:", error);
      throw error;
    }
  }

  /**
   * جلب المنتجات من المتجر
   */
  async getProducts(accessToken: string, page = 1): Promise<SallaProduct[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/products?page=${page}&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Salla API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data?.products || [];
    } catch (error) {
      console.error("[SallaClient] Failed to get products:", error);
      throw error;
    }
  }

  /**
   * جلب الطلبات من المتجر
   */
  async getOrders(accessToken: string, page = 1): Promise<SallaOrder[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/orders?page=${page}&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Salla API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data?.orders || [];
    } catch (error) {
      console.error("[SallaClient] Failed to get orders:", error);
      throw error;
    }
  }

  /**
   * جلب تفاصيل طلب معين
   */
  async getOrder(accessToken: string, orderId: number): Promise<SallaOrder> {
    try {
      const response = await fetch(`${this.baseUrl}/v2/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Salla API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("[SallaClient] Failed to get order:", error);
      throw error;
    }
  }

  /**
   * جلب إحصائيات المتجر
   */
  async getStats(accessToken: string) {
    try {
      const response = await fetch(`${this.baseUrl}/v2/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Salla API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("[SallaClient] Failed to get stats:", error);
      throw error;
    }
  }
}

export const sallaClient = new SallaClient();
