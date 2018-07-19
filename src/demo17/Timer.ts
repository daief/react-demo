export default class Timer {
  lastTime: number = 0
  period: number = 0

  tick(): number {
    const now = Date.now()
    if (this.lastTime === 0) {
      this.lastTime = now
    } else {
      this.period += now - this.lastTime
      this.lastTime = now
    }
    return this.period
  }

  stop() {
    this.lastTime = 0
  }

  clear() {
    this.lastTime = 0
    this.period = 0
  }
}

export const ticker = new Timer()
