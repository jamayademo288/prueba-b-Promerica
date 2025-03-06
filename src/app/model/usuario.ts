export interface Usuario {
  id: number
  first_name: string
  last_name: string
  country: string
  email: string
  phone: string
  gender: string
  website: string
  created_at: string
  updated_at: string
  flag?: string  //se deja opcional ya que puede o no puede venir en la respuesta
  nationality?: string //se deja opcional ya que puede o no puede venir en la respuesta
}
