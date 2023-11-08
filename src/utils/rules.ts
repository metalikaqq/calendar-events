
export const rules = {
  required: (massage: string) => ({
    required: true,
    massage
  }),
  isDateAfter: (massage: string) => ({
    validator: (_: any, value: any) => {
      if (value.isAfter(Date.now())) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(massage));
    }
  })
}
