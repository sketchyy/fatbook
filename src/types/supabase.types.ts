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
          fats: number | null
          hasIngredients: boolean
          id: number
          name: string | null
          proteins: number | null
          updatedAt: string | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          cookedWeight?: number | null
          createdAt?: string
          defaultPortion?: number | null
          fats?: number | null
          hasIngredients?: boolean
          id?: number
          name?: string | null
          proteins?: number | null
          updatedAt?: string | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          cookedWeight?: number | null
          createdAt?: string
          defaultPortion?: number | null
          fats?: number | null
          hasIngredients?: boolean
          id?: number
          name?: string | null
          proteins?: number | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      eatings: {
        Row: {
          calories: number
          carbs: number
          created_at: string
          day: string
          dish: number
          fats: number
          id: number
          meal: Database["public"]["Enums"]["meal"]
          portion: number
          proteins: number
          user: string
        }
        Insert: {
          calories: number
          carbs: number
          created_at?: string
          day: string
          dish: number
          fats: number
          id?: number
          meal: Database["public"]["Enums"]["meal"]
          portion: number
          proteins: number
          user?: string
        }
        Update: {
          calories?: number
          carbs?: number
          created_at?: string
          day?: string
          dish?: number
          fats?: number
          id?: number
          meal?: Database["public"]["Enums"]["meal"]
          portion?: number
          proteins?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_eatings_dish_fkey"
            columns: ["dish"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_eatings_user_fkey"
            columns: ["user"]
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
          dish: number
          fats: number
          id: number
          parentDish: number
          portion: number
          proteins: number
        }
        Insert: {
          calories: number
          carbs: number
          createdAt?: string | null
          dish: number
          fats: number
          id?: number
          parentDish: number
          portion: number
          proteins: number
        }
        Update: {
          calories?: number
          carbs?: number
          createdAt?: string | null
          dish?: number
          fats?: number
          id?: number
          parentDish?: number
          portion?: number
          proteins?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_dishIngredients_dish_fkey"
            columns: ["dish"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dishIngredients_ingredient_fkey"
            columns: ["parentDish"]
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
          id: number
          proteins: number
          user: string | null
        }
        Insert: {
          calories: number
          carbs: number
          fats: number
          id?: number
          proteins: number
          user?: string | null
        }
        Update: {
          calories?: number
          carbs?: number
          fats?: number
          id?: number
          proteins?: number
          user?: string | null
        }
        Relationships: []
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
          user: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_eatings_user_fkey"
            columns: ["user"]
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
