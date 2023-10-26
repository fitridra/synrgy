class Component {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
    withDriver
  }) {

    if (this.constructor === Component) {
      throw new Error('cannot create instance from abstract class')
    }
    
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
    this.withDriver = withDriver;
  }

  render() {
    return `    
    <div class="col-lg-4" style="margin-bottom:1%;">
      <div class="card h-100 mt-2">
        <div class="card-body">
          <img src="${this.image}" style="width: 24rem; height:24rem">
          <h5 class="card-title mt-4" style="font-weight: 400; font-size: 16px">${this.manufacture}/${this.model}</h5>
          <p style="font-weight:bold;">Rp ${formatRupiah(this.rentPerDay)} / hari</p>
          <p class="card-text">${this.description}</p>
          <p>
            <img src="./images/fi_users.png" style="width: 7%;">
            ${this.capacity} Orang</p>
          <p>
            <img src="./images/fi_settings.png" style="width: 7%;">
            ${this.transmission}</p>
          <p>
            <img src="./images/fi_calendar.png" style="width: 7%;color:white;">
            Tahun ${this.year}</p><br>
          <button class="btn btn-success position-absolute bottom-0 start-50 translate-middle-x" style="width: 91%;margin-bottom: 15px;"">Pilih Mobil</button>
        </div>
      </div>
    </div>
    `;
  }
}

class Car extends Component{}