export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dishes: {
        Row: {
          calories: number | null
          carbs: number | null
          cookedWeight: number | null
          createdAt: string
          defaultPortion: number | null
          deleted: boolean | null
          fats: number | null
          hasIngredients: boolean
          icon: string | null
          id: number
          legacyId: string | null
          name: string | null
          proteins: number | null
          searchable: unknown | null
          test: boolean | null
          updatedAt: string | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          cookedWeight?: number | null
          createdAt?: string
          defaultPortion?: number | null
          deleted?: boolean | null
          fats?: number | null
          hasIngredients?: boolean
          icon?: string | null
          id?: number
          legacyId?: string | null
          name?: string | null
          proteins?: number | null
          searchable?: unknown | null
          test?: boolean | null
          updatedAt?: string | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          cookedWeight?: number | null
          createdAt?: string
          defaultPortion?: number | null
          deleted?: boolean | null
          fats?: number | null
          hasIngredients?: boolean
          icon?: string | null
          id?: number
          legacyId?: string | null
          name?: string | null
          proteins?: number | null
          searchable?: unknown | null
          test?: boolean | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      eatings: {
        Row: {
          calories: number
          carbs: number
          createdAt: string
          day: string
          dishId: number | null
          fats: number
          id: number
          meal: Database["public"]["Enums"]["meal"]
          portion: number
          proteins: number
          userId: string
        }
        Insert: {
          calories: number
          carbs: number
          createdAt?: string
          day: string
          dishId?: number | null
          fats: number
          id?: number
          meal: Database["public"]["Enums"]["meal"]
          portion: number
          proteins: number
          userId: string
        }
        Update: {
          calories?: number
          carbs?: number
          createdAt?: string
          day?: string
          dishId?: number | null
          fats?: number
          id?: number
          meal?: Database["public"]["Enums"]["meal"]
          portion?: number
          proteins?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_eatings_dishId_fkey"
            columns: ["dishId"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_eatings_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          calories: number
          carbs: number
          createdAt: string | null
          dishId: number
          fats: number
          id: number
          parentDishId: number
          portion: number
          proteins: number
          test: boolean | null
        }
        Insert: {
          calories: number
          carbs: number
          createdAt?: string | null
          dishId: number
          fats: number
          id?: number
          parentDishId: number
          portion: number
          proteins: number
          test?: boolean | null
        }
        Update: {
          calories?: number
          carbs?: number
          createdAt?: string | null
          dishId?: number
          fats?: number
          id?: number
          parentDishId?: number
          portion?: number
          proteins?: number
          test?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_dishIngredients_dish_fkey"
            columns: ["dishId"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dishIngredients_ingredient_fkey"
            columns: ["parentDishId"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          calories: number
          carbs: number
          fats: number
          proteins: number
          userId: string
        }
        Insert: {
          calories: number
          carbs: number
          fats: number
          proteins: number
          userId: string
        }
        Update: {
          calories?: number
          carbs?: number
          fats?: number
          proteins?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_settings_user_fkey"
            columns: ["userId"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      eatings_by_day: {
        Row: {
          calories: number | null
          carbs: number | null
          day: string | null
          fats: number | null
          proteins: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_eatings_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      meal: "breakfast" | "lunch" | "dinner" | "snack"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
