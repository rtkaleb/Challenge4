export default class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const { city, cuisine, minRating, maxPrice, search } = this.queryString;
    const q = { isActive: true };
    if (city) q.city = city;
    if (cuisine) q.cuisine = { $in: cuisine.split(',') };
    if (minRating) q.rating = { ...(q.rating || {}), $gte: Number(minRating) };
    if (maxPrice) q.price_level = { ...(q.price_level || {}), $lte: Number(maxPrice) };
    if (search) q.$text = { $search: search };
    this.query = this.query.find(q);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-rating -createdAt');
    }
    return this;
  }
  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
