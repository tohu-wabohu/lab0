def prime(n)
    i = 2
    while i < n
        if n % i == 0
            return false
        end
        i += 1
    end
    return true
end

starting = Time.now

primes = 0
for i in 2..100000 do
    puts i if prime(i)
    primes += 1 if prime(i)
end

puts "primes:", primes
ending = Time.now
elapsed = ending - starting
puts elapsed
